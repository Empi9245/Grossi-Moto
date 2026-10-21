import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

// Exercise the same search/filter functions and real data used by CatalogPage.
const directory = await mkdtemp(join(tmpdir(), "grossi-search-"));
after(() => rm(directory, { recursive: true, force: true }));
for (const sourcePath of [
  "data/scooter-color-system",
  "data/catalog-scooters",
  "data/catalog-guidance",
  "lib/catalog-search",
]) {
  const source = await readFile(new URL(`../src/${sourcePath}.ts`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  const name = sourcePath.split("/").at(-1);
  await writeFile(join(directory, `${name}.mjs`), outputText.replace(
    /from "(?:\.\/|\.\.\/data\/)([^".]+)"/g,
    'from "./$1.mjs"',
  ));
}
const { defaultCatalogFilters, getVisibleScooters, getFilterCounts } = await import(
  pathToFileURL(join(directory, "catalog-search.mjs"))
);
const { catalogScooters } = await import(pathToFileURL(join(directory, "catalog-scooters.mjs")));
const ids = (query, filters = {}, useCase = "all") => getVisibleScooters(
  { ...defaultCatalogFilters, ...filters }, query, useCase,
).map(({ id }) => id).sort();

test("Agility 50 and Agility 350 identify distinct real models", () => {
  assert.deepEqual(ids("Agility 50"), ["agility-50-r16-plus"]);
  assert.deepEqual(ids("Agility 350"), ["agility-350"]);
  assert.deepEqual(ids("50"), ["agility-50-r16-plus", "filly-50", "super-8-50-r"]);
  assert.deepEqual(ids("Agility 5"), []);
});

test("125, 125cc and 125 cc find all nine 125cc models", () => {
  const expected = [
    "agility-s-125", "dink-x-125", "like-125", "micare-125", "people-s-125-abs",
    "skytown-125", "voge-sfida-sr1", "voge-sfida-sr1-adv", "voge-sfida-sr16-125",
  ];
  for (const query of ["125", "125cc", "125 cc", "125 CC"]) {
    assert.deepEqual(ids(query), expected, query);
  }
  assert.deepEqual(ids("12"), []);
});

test("case, accents, partial words, order and separators remain flexible", () => {
  for (const query of [" ÀGÌLITY  50 ", "50 agil", "AGILITY-50", "agility/50", "Agility, 50"]) {
    assert.deepEqual(ids(query), ["agility-50-r16-plus"], query);
  }
  assert.deepEqual(ids("agil"), ["agility-350", "agility-50-r16-plus", "agility-s-125"]);
  assert.deepEqual(ids("x town 250"), ["x-town-250st"]);
  assert.ok(ids("città").length > 0);
  assert.deepEqual(ids("CITTÀ"), ids("citta"));
});

test("real alphanumeric names stay searchable without matching longer numbers", () => {
  const cases = [
    ["AK575", ["ak575-premium"]],
    ["AK 575", ["ak575-premium"]],
    ["900DSX", ["voge-valico-900dsx"]],
    ["900 DSX", ["voge-valico-900dsx"]],
    ["800DSX", ["voge-valico-800rally"]],
    ["SR1", ["voge-sfida-sr1", "voge-sfida-sr1-adv"]],
    ["SR 1", ["voge-sfida-sr1", "voge-sfida-sr1-adv"]],
    ["SR16", ["voge-sfida-sr16-125", "voge-sfida-sr16-200"]],
    ["R16", ["agility-50-r16-plus"]],
    ["AK57", []],
  ];
  for (const [query, expected] of cases) assert.deepEqual(ids(query), expected, query);
});

test("every real model remains discoverable by its full name and short name", () => {
  for (const scooter of catalogScooters) {
    for (const query of [scooter.name, scooter.shortName]) {
      assert.ok(ids(query).includes(scooter.id), `${query}: ${scooter.id}`);
    }
  }
  // People S 200's editorial comparison with a 125 is not its displacement.
  assert.deepEqual(ids("People 125"), ["people-s-125-abs"]);
});

test("numeric search combines with brand, vehicle, displacement and usage", () => {
  assert.deepEqual(ids("Agility 50", { brand: "KYMCO", vehicleType: "scooter", displacement: "50cc" }, "city"), ["agility-50-r16-plus"]);
  assert.deepEqual(ids("Agility 50", { brand: "Voge" }), []);
  assert.deepEqual(ids("Agility 50", { displacement: "300-499cc" }), []);
  assert.deepEqual(ids("125", { brand: "Voge", displacement: "125cc" }), ["voge-sfida-sr1", "voge-sfida-sr1-adv", "voge-sfida-sr16-125"]);
  assert.deepEqual(ids("125", { vehicleType: "moto" }), []);
  assert.deepEqual(ids("900DSX", { vehicleType: "moto", brand: "Voge", displacement: "500cc+" }, "touring"), ["voge-valico-900dsx"]);
});

test("facet counts use the same exact numeric search as the results", () => {
  const counts = getFilterCounts({ ...defaultCatalogFilters }, "Agility 50", "all");
  assert.deepEqual(counts.brand, { all: 1, KYMCO: 1, Voge: 0 });
  assert.equal(counts.displacement["50cc"], 1);
  assert.equal(counts.displacement["300-499cc"], 0);
  const filtered = getFilterCounts({ ...defaultCatalogFilters, brand: "Voge" }, "125", "all");
  assert.equal(filtered.displacement["125cc"], 3);
  assert.equal(filtered.brand.KYMCO, 6);
});

test("clearing query or filters recovers results after an empty combination", () => {
  assert.deepEqual(ids("Agility 50", { brand: "Voge" }), []);
  assert.equal(ids("", { brand: "Voge" }).length, 10);
  assert.deepEqual(ids("Agility 50", defaultCatalogFilters), ["agility-50-r16-plus"]);
  assert.equal(ids("").length, 27);
  assert.deepEqual(ids("modello inesistente 9999"), []);
  for (const query of ["   ", "---", ", / "]) assert.equal(ids(query).length, 27);
});

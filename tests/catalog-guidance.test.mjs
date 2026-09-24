import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

// Compile the real modules into an isolated directory because the application
// uses extensionless TypeScript imports resolved by Next.js.
const directory = await mkdtemp(join(tmpdir(), "grossi-guidance-"));
after(() => rm(directory, { recursive: true, force: true }));
for (const name of [
  "scooter-color-system",
  "catalog-scooters",
  "catalog-guidance",
]) {
  const source = await readFile(
    new URL(`../src/data/${name}.ts`, import.meta.url),
    "utf8",
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
  });
  await writeFile(
    join(directory, `${name}.mjs`),
    outputText.replace(/from "\.\/([^".]+)"/g, 'from "./$1.mjs"'),
  );
}
const { catalogScooters, getCatalogScooterBrand } = await import(
  pathToFileURL(join(directory, "catalog-scooters.mjs"))
);
const { catalogUseCases, getCatalogGuidance, getModelAlternatives } =
  await import(pathToFileURL(join(directory, "catalog-guidance.mjs")));

test("every catalog model has curated advice and a recognized usage path", () => {
  const ids = catalogUseCases.map(({ id }) => id);
  assert.equal(catalogScooters.length, 27);
  for (const model of catalogScooters) {
    const advice = getCatalogGuidance(model);
    assert.ok(
      advice.useCases.length > 0,
      `Missing curated guidance: ${model.id}`,
    );
    assert.ok(
      advice.useCases.every((id) => ids.includes(id)),
      model.id,
    );
    assert.equal(
      new Set(advice.useCases).size,
      advice.useCases.length,
      model.id,
    );
    for (const field of ["whyChoose", "tradeoff", "checkInStore"]) {
      assert.ok(advice[field].length > 40, `${model.id}: ${field}`);
    }
  }
});

test("alternatives resolve to different real models and explain the choice", () => {
  for (const model of catalogScooters) {
    const alternatives = getModelAlternatives(model);
    assert.ok(alternatives.length >= 1 && alternatives.length <= 3, model.id);
    assert.equal(
      new Set(alternatives.map(({ scooter }) => scooter.id)).size,
      alternatives.length,
      model.id,
    );
    for (const alternative of alternatives) {
      assert.notEqual(alternative.scooter.id, model.id);
      assert.ok(catalogScooters.includes(alternative.scooter));
      assert.ok(alternative.reason.length > 40);
    }
  }
});

test("urban 50cc and 125cc models are not classified as touring", () => {
  for (const model of catalogScooters.filter((item) =>
    ["50cc", "125cc"].includes(item.filterCategory),
  )) {
    assert.deepEqual(getCatalogGuidance(model).useCases, ["city"], model.id);
  }
});

test("usage paths distinguish GT commuting, sport touring and crossover versatility", () => {
  for (const [id, expected] of [
    ["voge-sfida-sr3", ["commute"]],
    ["ak575-premium", ["touring"]],
    ["dtx-360-350", ["city", "commute", "touring"]],
    ["voge-valico-625dsx", ["commute", "touring"]],
  ]) {
    assert.deepEqual(
      getCatalogGuidance(catalogScooters.find((item) => item.id === id))
        .useCases,
      expected,
    );
  }
});

test("comparable city and GT models can be discovered across brands", () => {
  for (const id of ["skytown-125", "downtown-350-gt", "people-s-125-abs"]) {
    const model = catalogScooters.find((item) => item.id === id);
    assert.ok(
      getModelAlternatives(model).some(
        ({ scooter }) =>
          getCatalogScooterBrand(scooter) !== getCatalogScooterBrand(model),
      ),
    );
  }
});

test("unknown models do not inherit unverified recommendations", () => {
  const model = { ...catalogScooters[0], id: "future-model" };
  assert.deepEqual(getCatalogGuidance(model).useCases, []);
  assert.equal(getCatalogGuidance(model).whyChoose, model.positioning);
  assert.deepEqual(getModelAlternatives(model), []);
});

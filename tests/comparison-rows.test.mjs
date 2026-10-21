import test, { after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const directory = await mkdtemp(join(tmpdir(), "grossi-comparison-"));
after(() => rm(directory, { recursive: true, force: true }));
for (const [folder, name] of [
  ["data", "catalog-comparison-specs"],
  ["lib", "comparison-rows"],
]) {
  const source = await readFile(
    new URL(`../src/${folder}/${name}.ts`, import.meta.url),
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
    outputText.replace(
      '"../data/catalog-comparison-specs"',
      '"./catalog-comparison-specs.mjs"',
    ),
  );
}
const { getComparisonRows } = await import(
  pathToFileURL(join(directory, "comparison-rows.mjs"))
);

test("verified differences precede shared values while model columns keep selection order", () => {
  const rows = getComparisonRows(["people-s-125-abs", "downtown-350-gt"]);
  assert.deepEqual(
    rows.map((row) => row.key),
    ["seatHeight", "runningMass", "storage", "braking"],
  );
  assert.deepEqual(
    rows.map((row) => row.differs),
    [true, true, true, false],
  );
  const reversed = getComparisonRows(["downtown-350-gt", "people-s-125-abs"]);
  for (const row of rows)
    assert.deepEqual(
      reversed.find((item) => item.key === row.key).values,
      [...row.values].reverse(),
    );
});

test("missing data remains null and never becomes a difference or a fabricated zero", () => {
  const rows = getComparisonRows(["people-s-125-abs", "not-researched"]);
  assert.ok(rows.every((row) => !row.differs && row.values[1] === null));
  assert.ok(
    getComparisonRows(["not-researched", "also-missing"]).every((row) =>
      row.values.every((value) => value === null),
    ),
  );
});

test("adding a third verified version recomputes differences without mutating previous rows", () => {
  const ids = ["people-s-125-abs", "downtown-350-gt"];
  const before = getComparisonRows(ids);
  const after = getComparisonRows([...ids, "agility-s-125"]);
  assert.ok(after.every((row) => row.differs && row.values.length === 3));
  assert.equal(before.find((row) => row.key === "braking").differs, false);
  assert.deepEqual(ids, ["people-s-125-abs", "downtown-350-gt"]);
});

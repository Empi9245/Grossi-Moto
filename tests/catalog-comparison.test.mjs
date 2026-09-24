import test from "node:test";
import assert from "node:assert/strict";
import { comparisonReducer } from "../src/lib/catalog-comparison.ts";

const empty = { ids: [], message: "" };
const toggle = (state, id) =>
  comparisonReducer(state, { type: "toggle", id, name: `Modello ${id}` });

test("comparison never exceeds three models, including repeated rapid additions", () => {
  const state = ["a", "b", "c", "d", "e"].reduce(toggle, empty);
  assert.deepEqual(state.ids, ["a", "b", "c"]);
  assert.match(state.message, /Rimuovine uno/);
});

test("removing a selected model at the limit frees a slot and preserves order", () => {
  const full = ["a", "b", "c"].reduce(toggle, empty);
  const removed = toggle(full, "b");
  assert.deepEqual(removed.ids, ["a", "c"]);
  assert.match(removed.message, /rimosso/);
  assert.deepEqual(toggle(removed, "d").ids, ["a", "c", "d"]);
  assert.deepEqual(full.ids, ["a", "b", "c"]);
});

test("clear resets selection and announces how to start again", () => {
  const state = comparisonReducer(toggle(empty, "a"), { type: "clear" });
  assert.deepEqual(state.ids, []);
  assert.match(state.message, /Scegli due o tre/);
});

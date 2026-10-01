import test from "node:test";
import assert from "node:assert/strict";
import { comparisonReducer } from "../src/lib/catalog-comparison.ts";

const empty = { ids: [], message: "", phase: "select" };
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

test("browsing requires an explicit start before selecting models", () => {
  const browsing = { ...empty, phase: "browse" };
  assert.equal(toggle(browsing, "a"), browsing);
  const selecting = comparisonReducer(browsing, { type: "start" });
  assert.equal(selecting.phase, "select");
  assert.deepEqual(toggle(selecting, "a").ids, ["a"]);
});

test("comparison opens only with two or three models in selection mode", () => {
  assert.equal(comparisonReducer(empty, { type: "open" }), empty);
  const one = toggle(empty, "a");
  assert.equal(comparisonReducer(one, { type: "open" }), one);
  const two = toggle(one, "b");
  assert.equal(two.phase, "select");
  const opened = comparisonReducer(two, { type: "open" });
  assert.equal(opened.phase, "compare");
  assert.equal(toggle(opened, "c").phase, "compare");
  const browsing = comparisonReducer(two, { type: "stop" });
  assert.equal(comparisonReducer(browsing, { type: "open" }), browsing);
});

test("closing or leaving comparison preserves selection for resuming", () => {
  const two = ["a", "b"].reduce(toggle, empty);
  const opened = comparisonReducer(two, { type: "open" });
  const closed = comparisonReducer(opened, { type: "close" });
  assert.equal(closed.phase, "select");
  assert.deepEqual(closed.ids, ["a", "b"]);
  const stopped = comparisonReducer(opened, { type: "stop" });
  assert.equal(stopped.phase, "browse");
  assert.deepEqual(stopped.ids, ["a", "b"]);
  assert.deepEqual(comparisonReducer(stopped, { type: "start" }).ids, [
    "a",
    "b",
  ]);
});

test("removing below two models closes the table and keeps selection mode", () => {
  const two = ["a", "b"].reduce(toggle, empty);
  const opened = comparisonReducer(two, { type: "open" });
  const removed = toggle(opened, "a");
  assert.equal(removed.phase, "select");
  assert.deepEqual(removed.ids, ["b"]);
  assert.equal(toggle(removed, "b").phase, "select");
});

test("clearing the table returns to selection without leaving stale open state", () => {
  const two = ["a", "b"].reduce(toggle, empty);
  const cleared = comparisonReducer(comparisonReducer(two, { type: "open" }), {
    type: "clear",
  });
  assert.equal(cleared.phase, "select");
  assert.deepEqual(cleared.ids, []);
});

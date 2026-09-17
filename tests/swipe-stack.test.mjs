import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceOrder, shouldAdvanceSwipe } from '../src/lib/swipe-stack.ts';

test('taps and small flicks cannot advance', () => {
  assert.equal(shouldAdvanceSwipe(0, -1000), false);
  assert.equal(shouldAdvanceSwipe(-8, -900), false);
  assert.equal(shouldAdvanceSwipe(-45, -100), false);
});
test('upward distance or intentional velocity advances; downward does not', () => {
  assert.equal(shouldAdvanceSwipe(-101, 0), true);
  assert.equal(shouldAdvanceSwipe(-20, -501), true);
  assert.equal(shouldAdvanceSwipe(120, 900), false);
  assert.equal(shouldAdvanceSwipe(-60, -100, 50), true);
});
test('rotation preserves order and loops without duplicate cards', () => {
  let order = ['a', 'b', 'c', 'd'];
  assert.deepEqual(advanceOrder(order, true), ['b', 'c', 'd', 'a']);
  for (let i=0;i<4;i++) order=advanceOrder(order,true);
  assert.deepEqual(order,['a','b','c','d']);
});
test('empty, single and non-looping decks are safe', () => {
  assert.deepEqual(advanceOrder([],true),[]);
  assert.deepEqual(advanceOrder(['a'],true),['a']);
  assert.deepEqual(advanceOrder(['a','b'],false),['b']);
});

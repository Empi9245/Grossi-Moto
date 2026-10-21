import test from 'node:test';
import assert from 'node:assert/strict';
import { updateServiceGesture } from '../src/lib/service-gesture.ts';

const start = () => ({ x: 100, y: 100, pointerId: 1, axis: 'pending', moved: false });

test('stationary click and finger jitter remain taps without capturing', () => {
  for (const [x, y] of [[100, 100], [106, 108], [110, 100]]) {
    const gesture = start();
    assert.equal(updateServiceGesture(gesture, x, y), 0);
    assert.equal(gesture.moved, false);
    assert.equal(gesture.axis, 'pending');
  }
});

test('short drag suppresses disclosure without advancing; long swipe advances', () => {
  const gesture = start();
  assert.equal(updateServiceGesture(gesture, 80, 102), 0);
  assert.equal(gesture.moved, true);
  assert.equal(gesture.axis, 'horizontal');
  assert.equal(updateServiceGesture(gesture, 64, 102), 1);
  assert.equal(updateServiceGesture(start(), 160, 100), -1);
});

test('drag out and back cannot become a click', () => {
  const gesture = start();
  updateServiceGesture(gesture, 70, 100);
  assert.equal(updateServiceGesture(gesture, 100, 100), 0);
  assert.equal(gesture.moved, true);
});

test('vertical page gesture cannot turn into a carousel swipe', () => {
  const gesture = start();
  updateServiceGesture(gesture, 102, 120);
  assert.equal(gesture.axis, 'vertical');
  assert.equal(updateServiceGesture(gesture, 180, 130), 0);
  assert.equal(gesture.axis, 'vertical');
});

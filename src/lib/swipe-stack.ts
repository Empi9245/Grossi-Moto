export function shouldAdvanceSwipe(offset: number, velocity: number, threshold = 100, velocityThreshold = 500) {
  return offset < -Math.max(1, threshold) || (offset < -14 && velocity < -Math.max(1, velocityThreshold));
}

export function advanceOrder<T>(order: readonly T[], loop: boolean): T[] {
  if (order.length < 2) return [...order];
  return loop ? [...order.slice(1), order[0]] : order.slice(1);
}

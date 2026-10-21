const tapTolerance = 10;
const swipeThreshold = 36;

export type ServiceGesture = {
  x: number;
  y: number;
  pointerId: number;
  axis: "pending" | "horizontal" | "vertical";
  moved: boolean;
};

// Lock the first intentional direction and remember excursions, even if the
// pointer returns to its starting point before release.
export function updateServiceGesture(
  gesture: ServiceGesture,
  x: number,
  y: number,
) {
  const deltaX = x - gesture.x;
  const deltaY = y - gesture.y;
  const horizontal = Math.abs(deltaX);
  const vertical = Math.abs(deltaY);

  if (Math.max(horizontal, vertical) > tapTolerance) {
    gesture.moved = true;
    if (gesture.axis === "pending") {
      if (horizontal > vertical * 1.15) gesture.axis = "horizontal";
      else if (vertical >= horizontal) gesture.axis = "vertical";
    }
  }

  return gesture.axis === "horizontal" &&
    horizontal >= swipeThreshold && horizontal > vertical * 1.15
    ? deltaX < 0 ? 1 : -1
    : 0;
}

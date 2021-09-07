export const pc = (cx: number, cy: number, angle: number, radius: number) => {
  return {
    x: cx + radius * Math.cos(angle * (Math.PI / 180)),
    y: cy + radius * Math.sin(angle * (Math.PI / 180)),
  };
};

/**
 * Linear Interpolation
 * @param start starting point
 * @param end ending point
 * @param t time
 * @returns interpolated point
 */
export const lerp = (start: number, end: number, t: number) =>
  start + (end - start) * t;

/**
 * Divide 1 by <divs>
 * @param divs number of divisions to return
 * @returns Array of floats from 0...1
 */
export const interpolate = (divs: number) => {
  return [0, ...[...Array(divs).keys()].map(k => (1 / divs) * (k + 1))];
};

export const cubicBezierPoints = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  divs: number
) => {
  return interpolate(divs).map(t => ({
    x: lerp(lerp(x0, x1, t), lerp(x1, x2, t), t),
    y: lerp(lerp(y0, y1, t), lerp(y1, y2, t), t),
  }));
};

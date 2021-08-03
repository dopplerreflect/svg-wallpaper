import React from 'react';
import { pc } from '../utils';

const height = 512;
const width = 512;
const cx = width / 2;
const cy = height / 2;
const PHI = (Math.sqrt(5) - 1) / 2;
const circleThickness = 2 * (cy - (cy - cy * PHI ** 6));
const radius = cy - circleThickness;
export default function Dash() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="blue-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="hsl(240, 50%, 75%)" />
          <stop offset="100%" stopColor="hsl(240, 50%, 25%)" />
        </linearGradient>
        <linearGradient id="orange-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="hsl(30, 100%, 25%)" />
          <stop offset="100%" stopColor="hsl(30, 100%, 75%)" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="hsl(240, 25%, 10%)" />
      <circle
        cx={cx}
        cy={cy}
        r={cy - cy * PHI ** 6}
        strokeWidth={circleThickness}
        // stroke={`hsl(210, 50%, 70%)`}
        stroke="url(#blue-gradient)"
        fill="none"
      />
      <path
        d={[
          `M${cx},${circleThickness}`,
          `L${pc(cx, cy, 306, radius * PHI ** 2).x},`,
          `${pc(cx, cy, 306, radius * PHI ** 2).y}`,
          `L${pc(cx, cy, 0, radius * PHI ** 6).x},`,
          `${pc(cx, cy, 0, radius * PHI ** 6).y}`,
          `L${pc(cx, cy, 90, radius).x},`,
          `${pc(cx, cy, 90, radius).y}`,
          `L${pc(cx, cy, 180, radius * PHI ** 6).x},`,
          `${pc(cx, cy, 180, radius * PHI ** 6).y}`,
          `L${pc(cx, cy, 234, radius * PHI ** 2).x},`,
          `${pc(cx, cy, 234, radius * PHI ** 2).y}`,
          `Z`,
        ].join(' ')}
        fill="url(#orange-gradient)"
        transform={`rotate(216, ${cx}, ${cy})`}
      />
    </svg>
  );
}

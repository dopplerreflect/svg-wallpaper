import React from 'react';
import { cubicBezierPoints, interpolate, lerp } from '../utils';
import Star from './components/star';

const width = 1920;
const height = 1080;
const x1 = 0;
const y1 = 0;

export default function Bezier() {
  return (
    <svg xmlns="http://www.w3.org/svg/2000" viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill="hsl(225,50%,20%)" />
      {interpolate(20).map(k => (
        <circle
          key={k}
          cx={lerp(lerp(x1, x1, k), lerp(x1, width, k), k)}
          cy={lerp(lerp(y1, height, k), lerp(height, height, k), k)}
          r={40}
          stroke="white"
          fill="none"
        />
      ))}
      {interpolate(20).map(k => (
        <circle
          key={k}
          cx={lerp(lerp(x1, width, k), lerp(width, width, k), k)}
          cy={lerp(lerp(y1, 0, k), lerp(0, height, k), k)}
          r={40}
          stroke="white"
          fill="none"
        />
      ))}
      {cubicBezierPoints(50, 50, 50, 1030, 1870, 1030, 20).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={50} stroke="white" />
      ))}
    </svg>
  );
}

import React from 'react';
import { interpolate, lerp } from '../utils';
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
      {/* <path d="M0,0 Q 0 1080 1920 1080" stroke="white" fill="none" /> */}
      {/* <path d="M0,0 Q 1920 0 1920 1080" stroke="white" fill="none" /> */}
    </svg>
  );
}

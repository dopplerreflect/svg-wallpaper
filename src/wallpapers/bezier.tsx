import React from 'react';
import { quadraticBezierPoints } from '../utils';
import Star from './components/star';

const width = 1920;
const height = 1080;
const x1 = 0;
const y1 = 0;

export default function Bezier() {
  return (
    <svg xmlns="http://www.w3.org/svg/2000" viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill="hsl(225,50%,20%)" />
      <path d="M50 50 Q50 1030 1870 1030" stroke="white" fill="none" />
      {quadraticBezierPoints(50, 50, 50, 1030, 1870, 1030, 10).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={50} stroke="white" fill="none" />
      ))}
      {quadraticBezierPoints(50, 50, 1870, 50, 1870, 1030, 10)
        .slice(1, -1)
        .map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={50} stroke="white" fill="none" />
        ))}
    </svg>
  );
}

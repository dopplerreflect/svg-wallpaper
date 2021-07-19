import React, { createContext } from 'react';

const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const r = width / 6;
const angles = [...Array(6).keys()].map(k => (360 / 6) * k);

const pc = (angle: number, radius: number) => {
  return {
    x: cx + radius * Math.cos(angle * (Math.PI / 180)),
    y: cy + radius * Math.sin(angle * (Math.PI / 180)),
  };
};

export default function Hex() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect width={width} height={height} fill="hsl(240, 50%, 2.5%)" />
      {angles.map(angle => (
        <circle
          key={angle}
          cx={pc(angle, r * 2).x}
          cy={pc(angle, r * 2).y}
          r={r}
          fill={`hsl(${angle + 30}, 100%, 5%)`}
          stroke={`hsla(${angle + 30}, 100%, 50%, 0.5)`}
          strokeWidth={r * 0.61803}
        />
      ))}
    </svg>
  );
}

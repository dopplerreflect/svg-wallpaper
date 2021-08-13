import React from 'react';

const PHI = (Math.sqrt(5) + 1) / 2;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;

const pentAngles = [...Array(5).keys()].map(k => (360 / 5) * k - 90);
const radii = [...Array(15).keys()].slice(1, 15).map(k => Math.floor(PHI ** k));
const pc = (angle: number, radius: number) => ({
  x: Math.floor(cx + radius * Math.cos(angle * (Math.PI / 180))),
  y: Math.floor(cy + radius * Math.sin(angle * (Math.PI / 180))),
});

console.log({ radii });
export default function Ripples() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="filter-1">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.0" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width={width} height={height} fill={`hsl(225, 100%, 5%)`} />
      <g
        id="ripples"
        filter="url(#filter-1)"
        stroke="hsl(225, 100%, 50%)"
        strokeWidth={1}
        fill="none"
      >
        {pentAngles.map(a => {
          return radii.map(r => (
            <circle
              key={`${a}-${r}`}
              cx={pc(a, radii[10]).x}
              cy={pc(a, radii[10]).y}
              r={r}
            />
          ));
        })}
      </g>
    </svg>
  );
}

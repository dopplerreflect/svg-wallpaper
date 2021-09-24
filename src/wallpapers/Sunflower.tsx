import React from 'react';
import Hexagon from './components/hexagon';

const PHI = (Math.sqrt(5) + 1) / 2;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;

export const p = (angle: number, radius: number) => {
  return {
    x: cx + radius * Math.cos(angle * (Math.PI / 180)),
    y: cy + radius * Math.sin(angle * (Math.PI / 180)),
  };
};
export default function Sunflower() {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>
      <rect width={width} height={height} fill="hsl(240, 100%, 10%)" />
      <text
        x={cx - 32}
        y={cy + 96}
        fontSize="48em"
        textAnchor="middle"
        alignmentBaseline="middle"
        filter="url(#blur)"
      >
        ॐ
      </text>
      {[...Array(360).keys()].map(i => {
        let angle = Math.round((i * 137.5006) % 360);
        let r = ((cy - cy / 5) / 360) * i;
        return (
          <g key={i}>
            <Hexagon
              cy={p(angle, r).y}
              cx={p(angle, r).x}
              r={r / 15}
              rotate={angle}
              // stroke={`hsl(${(r * 137.5) / 360 + 300}, 100%, 75%)`}
              stroke="white"
              strokeWidth={r / 180}
              fill={`hsl(${(r * 137.5) / 360 + 240}, 100%, 50%)`}
              // fill="none"
              fillOpacity={1}
            />
          </g>
        );
      })}
    </svg>
  );
}

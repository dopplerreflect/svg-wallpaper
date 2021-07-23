import React from 'react';
import { pc } from '../utils';
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const cr = height / 10;
const angles = [...Array(6).keys()].map(k => (360 / 6) * k - 90);

export default function Metatron() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill={`hsl(270, 100%, 5%)`} />
      <circle cx={cx} cy={cy} r={cr} stroke={'white'} fill={`transparent`} />
      {[cr * 2, cr * 4].map(r =>
        angles.map(a => (
          <g key={a}>
            <circle
              cx={pc(cx, cy, a, r).x}
              cy={pc(cx, cy, a, r).y}
              r={cr}
              stroke={`white`}
              fill={`transparent`}
            />
            <line
              x1={pc(cx, cy, a, r).x}
              y1={pc(cx, cy, a, r).y}
              x2={pc(cx, cy, a + 60, r).x}
              y2={pc(cx, cy, a + 60, r).y}
              stroke={`white`}
            />
          </g>
        ))
      )}
      {angles.map(a => (
        <g key={a}>
          <line
            x1={pc(cx, cy, a, cr * 4).x}
            y1={pc(cx, cy, a, cr * 4).y}
            x2={pc(cx, cy, a + 120, cr * 4).x}
            y2={pc(cx, cy, a + 120, cr * 4).y}
            stroke={`white`}
          />
          <line
            x1={pc(cx, cy, a, cr * 4).x}
            y1={pc(cx, cy, a, cr * 4).y}
            x2={pc(cx, cy, a + 120, cr * 2).x}
            y2={pc(cx, cy, a + 120, cr * 2).y}
            stroke={`white`}
          />
          <line
            x1={pc(cx, cy, a, cr * 4).x}
            y1={pc(cx, cy, a, cr * 4).y}
            x2={pc(cx, cy, a - 120, cr * 2).x}
            y2={pc(cx, cy, a - 120, cr * 2).y}
            stroke={`white`}
          />
          <line
            x1={pc(cx, cy, a, cr * 4).x}
            y1={pc(cx, cy, a, cr * 4).y}
            x2={cx}
            y2={cy}
            stroke={`white`}
          />
        </g>
      ))}
    </svg>
  );
}

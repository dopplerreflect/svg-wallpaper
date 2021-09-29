import React from 'react';
import { pc } from '../utils';
const width = 1080;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const cr = height / 12;
const angles = [...Array(6).keys()].map(k => (360 / 6) * k - 90);

const stroke = `hsl(270, 100%, 75%)`;
const strokeWidth = 2;

export default function Metatron() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="glow">
          <feFlood
            floodColor={`hsl(270, 100%, 50%)`}
            floodOpacity={1}
            result="flood"
          />
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="mask"
          />
          <feMorphology
            in="mask"
            operator="dilate"
            radius="2"
            result="dilate"
          />
          <feGaussianBlur in="dilate" stdDeviation={2} result="blur" />
          <feFlood
            floodColor={`hsl(240, 100%, 50%)`}
            floodOpacity={1}
            result="flood2"
          />
          <feComposite
            in="flood2"
            in2="SourceGraphic"
            operator="in"
            result="mask2"
          />
          <feMorphology
            in="mask2"
            operator="dilate"
            radius="4"
            result="dilate2"
          />
          <feGaussianBlur in="dilate2" stdDeviation={6} result="blur2" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="radialGradient">
          <stop offset="0%" stopColor={`hsl(240, 100%, 50%)`} />
          <stop
            offset="100%"
            stopColor={`hsl(240, 100%, 5%)`}
            stopOpacity={0}
          />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="black" />
      <g id="metatron" filter="url(#glow)">
        <circle cx={cx} cy={cy} r={cr} stroke={stroke} fill={`none`} />
        {[cr * 2, cr * 4].map(r =>
          angles.map(a => (
            <g key={a}>
              <circle
                cx={pc(cx, cy, a, r).x}
                cy={pc(cx, cy, a, r).y}
                r={cr}
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill={`none`}
              />
              <line
                x1={pc(cx, cy, a, r).x}
                y1={pc(cx, cy, a, r).y}
                x2={pc(cx, cy, a + 60, r).x}
                y2={pc(cx, cy, a + 60, r).y}
                stroke={stroke}
                strokeWidth={strokeWidth}
              />
              <line
                x1={pc(cx, cy, a, r).x}
                y1={pc(cx, cy, a, r).y}
                x2={pc(cx, cy, a + 120, r).x}
                y2={pc(cx, cy, a + 120, r).y}
                stroke={stroke}
                strokeWidth={strokeWidth}
              />
            </g>
          ))
        )}
        {angles.map(a => (
          <g key={a}>
            <line
              x1={pc(cx, cy, a, cr * 4).x}
              y1={pc(cx, cy, a, cr * 4).y}
              x2={pc(cx, cy, a + 120, cr * 2).x}
              y2={pc(cx, cy, a + 120, cr * 2).y}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
            <line
              x1={pc(cx, cy, a, cr * 4).x}
              y1={pc(cx, cy, a, cr * 4).y}
              x2={pc(cx, cy, a - 120, cr * 2).x}
              y2={pc(cx, cy, a - 120, cr * 2).y}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
            <line
              x1={pc(cx, cy, a, cr * 4).x}
              y1={pc(cx, cy, a, cr * 4).y}
              x2={cx}
              y2={cy}
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

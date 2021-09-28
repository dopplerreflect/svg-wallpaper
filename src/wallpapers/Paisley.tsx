import React from 'react';
import { pc } from '../utils';

const PHI = (Math.sqrt(5) + 1) / 2;
const PHIm1 = PHI - 1;
const width = 1080;
const height = 1080;
const cx = width / 2;
const cy = height / 2;

const p = (angle: number, radius: number) => pc(cx, cy, angle, radius);

const ps = (angle: number, radius: number) =>
  `${p(angle, radius).x},${p(angle, radius).y}`;

const gr = [...Array(4).keys()].map(k => cy * PHIm1 ** (k + 1));

const angles = [...Array(6).keys()].map(k => 60 * k);
const basehue = 0;

export default function Paisley() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <radialGradient id="radialGradient">
          <stop offset="0%" stopColor={`hsl(${basehue + 180}, 100%, 50%)`} />
          <stop offset="100%" stopColor={`hsl(${basehue + 270}, 100%, 50%)`} />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
        <path
          id="paisley"
          d={[
            `M${ps(330, gr[0])}`,
            `S${ps(310, gr[1])}`,
            `${ps(5, gr[2])}`,
            `A${gr[2]},${gr[2]} 0 1 1 ${ps(190, gr[2])}`,
            `S${ps(255, gr[0])}`,
            `${ps(330, gr[0])}`,
            `M${ps(0, gr[3])}`,
            `A${gr[3]},${gr[3]} 1 1 0 ${ps(-359.9, gr[3])}`,
          ].join()}
          stroke={`hsl(${basehue + 0}, 100%, 15%)`}
          strokeWidth={cy / 80}
          fill={`hsl(${basehue + 30}, 100%, 50%)`}
          fillOpacity="0.75"
        />
      </defs>
      <rect
        width={width}
        height={height}
        // fill={`hsl(${basehue + 0}, 100%, 25%)`}
        fill="url(#radialGradient)"
      />
      {gr.map(r => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          stroke={`hsl(${basehue + 0}, 100%, 15%)`}
          strokeWidth={cy / 80}
          fill="none"
          filter="url(#blur)"
        />
      ))}
      {angles.map(
        a =>
          a % 120 === 0 && (
            <use
              key={a}
              xlinkHref="#paisley"
              transform={`rotate(${a}, ${cx}, ${cy}), translate(${
                cy * PHIm1 ** 2
              })`}
            />
          )
      )}
      {angles.map(
        a =>
          a % 120 === 60 && (
            <use
              key={a}
              xlinkHref="#paisley"
              transform={`rotate(${a}, ${cx}, ${cy}), translate(${
                cy * PHIm1 ** 2
              })`}
            />
          )
      )}
    </svg>
  );
}

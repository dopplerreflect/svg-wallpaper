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
          <stop offset="70%" stopColor={`hsl(${basehue + 270}, 100%, 50%)`} />
          <stop offset="100%" stopColor={`hsl(${basehue + 270}, 100%, 10%)`} />
        </radialGradient>
        <linearGradient id="linearGradient" gradientTransform="rotate(-15)">
          <stop offset="0%" stopColor={`hsl(${basehue + 60}, 100%, 50%)`} />
          <stop offset="100%" stopColor={`hsl(${basehue + 0}, 100%, 50%)`} />
        </linearGradient>
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
            `S${ps(258, gr[0])}`,
            `${ps(330, gr[0])}`,
            `M${ps(0, gr[3])}`,
            `A${gr[3]},${gr[3]} 1 1 0 ${ps(-359.9, gr[3])}`,
          ].join()}
          stroke={`hsl(${basehue + 30}, 50%, 25%)`}
          strokeWidth={cy / 80}
          // fill={`hsl(${basehue + 30}, 100%, 50%)`}
          fill="url(#linearGradient)"
          fillOpacity={0.75}
          filter="url(#paisleyHexShadow)"
        />
        <filter id="paisleyHexShadow">
          <feFlood
            result="flood"
            floodColor={`hsl(${basehue + 30}, 100%, 0%)`}
            floodOpacity={1}
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
            radius={cy / 80}
            result="dilated"
          />
          <feGaussianBlur in="dilated" stdDeviation={cy / 40} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="stripeBlur">
          <feGaussianBlur stdDeviation={cy / 600} />
        </filter>
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
      <g id="stripes" filter="url(#stripeBlur)">
        {[...Array(cy / 3).keys()].map(k => (
          <g key={k}>
            <line
              x1={0}
              y1={k * 6}
              x2={width}
              y2={k * 6}
              stroke={`hsl(${basehue + 0 + k * 2}, 100%, 20%)`}
              strokeWidth={cy / 540}
            />
            <line
              x1={k * 6}
              y1={0}
              x2={k * 6}
              y2={height}
              stroke={`hsl(${basehue + 180 + k * 2}, 100%, 20%)`}
              strokeWidth={cy / 540}
            />
          </g>
        ))}
      </g>
      <g id="paisleyHex">
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
      </g>
    </svg>
  );
}

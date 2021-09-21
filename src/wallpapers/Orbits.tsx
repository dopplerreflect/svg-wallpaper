import React from 'react';
import { pc } from '../utils';
const PHI = (1 + Math.sqrt(5)) / 2;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const earthRadius = (height / 10) * 4;
const venusRadius = earthRadius * (PHI - 1);

export default function Orbits() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="bgFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013"
            seed="13"
            result="noise"
          />
          <feColorMatrix
            values="0 0 0.5 0 0
                    0 0 0 0 0
                    1 1 1 1 0 
                    0 0 0 0.15 0"
          />
        </filter>
        <filter id="blurFilter">
          <feGaussianBlur stdDeviation="3" in="SourceGraphic" result="blur" />
          <feComponentTransfer in="blur" result="transfer">
            <feFuncR type="linear" slope={2} />
            <feFuncG type="linear" slope={2} />
            <feFuncB type="linear" slope={2} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="transfer" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect
        width={width}
        height={height}
        filter="url(#bgFilter)"
        // fill={`hsl(225, 50%, 10%)`}
      />
      <g
        transform={`rotate(${180 - 18}, ${cx}, ${cy})`}
        filter="url(#blurFilter)"
      >
        {[...Array(72 * 8).keys()].map((a, i) => (
          <line
            key={i}
            x1={pc(cx, cy, a * 5, earthRadius).x}
            y1={pc(cx, cy, a * 5, earthRadius).y}
            x2={pc(cx, cy, a * 5 * 1.625, venusRadius).x}
            y2={pc(cx, cy, a * 5 * 1.625, venusRadius).y}
            stroke={`hsl(${a * 5}, 100%, 50%)`}
            strokeWidth={1}
          />
        ))}
      </g>
    </svg>
  );
}

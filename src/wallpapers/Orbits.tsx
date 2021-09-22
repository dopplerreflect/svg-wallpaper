import React from 'react';
import { pc } from '../utils';
const PHI = (1 + Math.sqrt(5)) / 2;
const width = 2400;
const height = 2400;
const cx = width / 2;
const cy = height / 2;
const earthRadius = (height / 10) * 4;
const venusRadius = earthRadius * (PHI - 1);
const degrees = 10;

export default function Orbits() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="bgFilter">
          <feTurbulence type="fractalNoise" baseFrequency={(PHI - 1) ** 2} />
          <feSpecularLighting
            specularExponent="20"
            lightingColor="hsl(240, 50%, 40%)"
            surfaceScale="1"
          >
            <fePointLight x={cx} y={cy} z={cy} />
          </feSpecularLighting>
        </filter>
        <filter id="blurFilter">
          <feGaussianBlur stdDeviation="5" in="SourceGraphic" result="blur" />
          <feColorMatrix type="saturate" values="0.0" result="saturate" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.5" />
            <feFuncG type="linear" slope="0.5" />
            <feFuncB type="linear" slope="2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width={width} height={height} fill="black" />

      <rect width={width} height={height} filter="url(#bgFilter)" />
      <g transform={`rotate(${90}, ${cx}, ${cy})`} filter="url(#blurFilter)">
        {[...Array((360 / degrees) * 8).keys()].map((a, i) => (
          <line
            key={i}
            x1={pc(cx, cy, a * degrees, earthRadius).x}
            y1={pc(cx, cy, a * degrees, earthRadius).y}
            x2={pc(cx, cy, a * degrees * 1.625, venusRadius).x}
            y2={pc(cx, cy, a * degrees * 1.625, venusRadius).y}
            stroke={`hsl(${((a * degrees) % 360) - 72}, 100%, 50%)`}
            strokeWidth={2}
          />
        ))}
        {[...Array(360 / degrees).keys()].map(a => (
          <path
            key={a}
            d={`M${pc(cx, cy, a * degrees - degrees / 2, earthRadius).x},${
              pc(cx, cy, a * degrees - degrees / 2, earthRadius).y
            }A${earthRadius},${earthRadius} 0 0 1 ${
              pc(cx, cy, a * degrees + degrees / 2, earthRadius).x
            },${pc(cx, cy, a * degrees + degrees / 2, earthRadius).y}`}
            strokeWidth="5"
            stroke={`hsl(${a * degrees - 72}, 100%, 50%)`}
            fill="none"
          />
        ))}
      </g>
    </svg>
  );
}

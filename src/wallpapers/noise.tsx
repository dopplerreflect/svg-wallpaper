import React from 'react';
import Star from './components/star';

const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const PHI = (Math.sqrt(5) - 1) / 2;
const angles = [...Array(5).keys()].map(k => (360 / 5) * k - 90);

const pc = (angle: number) => ({
  x: cx + cy * Math.cos(angle * (Math.PI / 180)),
  y: cy + cy * Math.sin(angle * (Math.PI / 180)),
});
console.log(angles);
export default function Noise() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="filter-1">
          <feTurbulence
            baseFrequency={0.0125}
            type="fractalNoise"
            result="noise"
          />
          {angles.map(angle => (
            <feSpecularLighting
              key={angle}
              in="noise"
              lightingColor={`hsl(${angle}, 100%, 30%)`}
              surfaceScale="20"
              result={`result-${angle}`}
            >
              <feSpotLight
                x={pc(angle).x}
                y={pc(angle).y + 52}
                z="90"
                pointsAtX={pc(angle + 180).x}
                pointsAtY={pc(angle + 180).y}
                pointsAtZ="0"
                specularExponent="27"
                limitingConeAngle="54"
              />
            </feSpecularLighting>
          ))}
          <feMerge>
            {angles.map(angle => (
              <feMergeNode key={angle} in={`result-${angle}`} />
            ))}
          </feMerge>
        </filter>
      </defs>
      <rect width={width} height={height} fill="black" />
      <rect width={width} height={height} filter="url(#filter-1)" fill="blue" />
      <circle
        cx={cx}
        cy={cy + 52}
        r={cy * PHI}
        stroke="hsl(225, 100%, 85%)"
        strokeWidth="4"
        fill="none"
      />
      <circle
        cx={cx}
        cy={cy + 52}
        r={cy * PHI ** 2}
        stroke="hsl(225, 100%, 85%)"
        strokeWidth="4"
        fill="none"
      />
      <Star
        cx={cx}
        cy={cy + 52}
        r={cy}
        stroke="hsl(225, 100%, 85%)"
        fill="none"
        strokeWidth={4}
      />
      <Star
        cx={cx}
        cy={cy + 52}
        r={cy * PHI}
        stroke="hsl(225, 100%, 85%)"
        fill="none"
        strokeWidth={4}
      />
      <Star
        cx={cx}
        cy={cy + 52}
        r={cy * PHI ** 2}
        stroke="hsl(225, 100%, 85%)"
        fill="none"
        strokeWidth={4}
        rotate={90}
      />
    </svg>
  );
}

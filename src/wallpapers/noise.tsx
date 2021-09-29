import React from 'react';
import Star from './components/star';

const width = 1080;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const PHI = (Math.sqrt(5) - 1) / 2;
const angles = [...Array(5).keys()].map(k => (360 / 5) * k - 90);

const pc = (angle: number) => ({
  x: cx + cy * Math.cos(angle * (Math.PI / 180)),
  y: cy + cy * Math.sin(angle * (Math.PI / 180)),
});
export default function Noise() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="filter-1">
          <feTurbulence
            baseFrequency={(PHI - 1) ** 2}
            type="fractalNoise"
            result="noise"
          />
          {angles.map(angle => (
            <feSpecularLighting
              key={angle}
              in="noise"
              lightingColor={`hsl(${angle}, 100%, 30%)`}
              surfaceScale="3"
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
        <filter id="starOutline">
          <feFlood floodColor="hsl(240, 100%, 5%)" result="flood" />
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="mask"
          />
          <feMorphology
            in="mask"
            operator="dilate"
            radius={4}
            result="dilate"
          />
          <feGaussianBlur in="dilate" stdDeviation={4} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width={width} height={height} fill="black" />
      <rect width={width} height={height} filter="url(#filter-1)" fill="blue" />
      <g
        id="starthing"
        filter="url(#starOutline)"
        stroke="hsl(30, 25%, 50%)"
        strokeWidth={8}
        fill="none"
      >
        <circle cx={cx} cy={cy + 52} r={cy * PHI} fill="none" />
        <circle cx={cx} cy={cy + 52} r={cy * PHI ** 2} fill="none" />
        <Star cx={cx} cy={cy + 52} r={cy} />
        <Star cx={cx} cy={cy + 52} r={cy * PHI} />
        <Star cx={cx} cy={cy + 52} r={cy * PHI ** 2} rotate={90} />
      </g>
    </svg>
  );
}

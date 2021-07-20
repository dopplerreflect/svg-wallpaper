import React, { createContext } from 'react';

const clip = false; // whether to set width/height attrs on svg element
const width = 1920;
const height = 1080;
const lineCount = 10;
const cx = width / 2;
const cy = height / 2;
const angles = [...Array(10).keys()].map(k => (360 / 10) * k);
const radii = [cy, cy * 0.61803 ** 2];
const pc = (angle: number, radius: number) => {
  return {
    x: cx + radius * Math.cos(angle * (Math.PI / 180)),
    y: cy + radius * Math.sin(angle * (Math.PI / 180)),
  };
};

export default function Hex() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={clip ? width : undefined}
      height={clip ? height : undefined}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
        <filter id="bg-filter">
          <feTurbulence baseFrequency="0.04, 0.00125" result="turbulence" />
          <feDiffuseLighting
            lightingColor={`hsl(240, 100%, 20%)`}
            surfaceScale={20}
            result="lighting"
          >
            <feDistantLight azimuth={0} elevation={0} />
          </feDiffuseLighting>
          <feBlend in="turbulence" in2="lighting" mode="darken" />
        </filter>
      </defs>
      <rect width={width} height={height} filter="url(#bg-filter)" />
      {[...Array(10).keys()].map(i => (
        <path
          key={i}
          d={`M ${0},${(height / lineCount) * i} L${
            (width / lineCount) * i
          },${height} L${
            (width / lineCount) * i + width / lineCount / 2
          },${height} Z`}
          stroke={`hsla(45, 100%, 50%, 0.5)`}
          strokeWidth={2}
          fill={`hsla(240, 100%, 50%, 0.25)`}
          fillRule="evenodd"
        />
      ))}
      <path
        d={`M${pc(angles[0], radii[0]).x},${pc(angles[0], radii[0]).y} ${angles
          .slice(1, 10)
          .map(
            a =>
              `L${pc(a, a % 72 === 0 ? radii[0] : radii[1]).x},${
                pc(a, a % 72 === 0 ? radii[0] : radii[1]).y
              }`
          )
          .join(' ')} Z`}
        stroke={`hsla(45, 100%, 50%, 0.3)`}
        strokeWidth={30}
        fill={`hsla(240, 60%, 50%, 0.3)`}
        transform={`rotate(-90, ${cx}, ${cy}) translate(-55, 0)`}
        filter="url(#blur)"
      />
    </svg>
  );
}

import React from 'react';

const PHI = (Math.sqrt(5) + 1) / 2;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const angles = [...Array(144).keys()].map(k => k * (360 - 360 / PHI));
export default function Test() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <radialGradient
          id="bg-gradient"
          cx={cx}
          cy={cy}
          r={cy}
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0%" stopColor="hsl(225,100%,70%)" />
          <stop offset="100%" stopColor="hsl(225,100%,0%)" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="BLUR" />
          <feOffset dx="0" dy="10" result="OFFSET" />
          <feMerge type="multiply">
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="BLUR" />
            <feMergeNode in="OFFSET" />
          </feMerge>
        </filter>
      </defs>
      <rect width={width} height={height} fill={`hsl(225, 100%, 10%)`} />
      <text
        x={cx}
        y={cy}
        fill="hsl(55, 100%, 50%)"
        filter="url(#blur)"
        fontSize="8em"
        rotate="0"
        textAnchor="middle"
      >
        Golden Rectangles, Golden Angle
      </text>
      <rect
        width={width}
        height={height}
        fill="url(#bg-gradient)"
        fillOpacity={0.25}
      />
      {angles.map(a => (
        <rect
          key={a}
          x={cx - (cy * (1 / PHI)) / 2}
          y={cy}
          width={cy * (1 / PHI)}
          height={cy}
          fill={`hsla(${a}, 100%, 50%, 0.0075)`}
          stroke={`hsl(${a}, 33%, 50%)`}
          transform={`rotate(${a}, ${cx}, ${cy})`}
        />
      ))}
    </svg>
  );
}

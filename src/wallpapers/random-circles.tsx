import React from 'react';
import Star from './components/star';

const clip = false;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const numPoints = 200;
const randomPoints = [...Array(numPoints)].map(i => ({
  cx: Math.round(Math.random() * width),
  cy: Math.round(Math.random() * height),
  r: Math.round(Math.random() * 100),
}));

export default function RandomCircles() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={clip ? width : undefined}
      height={clip ? height : undefined}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id="bg-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="hsl(220, 100%, 30%)" />
          <stop offset="50%" stopColor="hsl(240, 100%, 20%)" />

          <stop offset="90%" stopColor="hsl(260, 100%, 10%)" />
        </linearGradient>
        {[...Array(Math.floor(numPoints / 20)).keys()].map(k => (
          <filter key={k} id={`blur-${k}`}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={Math.floor(numPoints / 20) - k}
            />
          </filter>
        ))}
      </defs>
      <rect width={width} height={height} fill="url(#bg-gradient)" />
      {randomPoints.map((p, i) => (
        <Star
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={height * 0.61803 ** 6}
          stroke={`hsla(${180 + p.cy / 10.8}, 100%, 50%, 1)`}
          fill={`hsla(${240 + p.cy / 10.8}, 100%, 50%, ${
            ((numPoints / 20) * (i / numPoints)) / 10
          })`}
          strokeWidth={p.r / 20}
          transform={`rotate(${Math.random() * 72}, ${p.cx}, ${p.cy})`}
          filter={`url(#blur-${Math.floor(
            (numPoints / 20) * (i / numPoints)
          )})`}
        />
      ))}
    </svg>
  );
}

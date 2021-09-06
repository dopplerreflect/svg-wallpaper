import React from 'react';

const width = 1920;
const height = 1080;
const hue = 15;
const saturation = '100%';
const lightness = '50%';
const squareSide = height / 4;

// const randomPoints = (count: number) => {
//   return [...Array(count).keys()].map(i => ({
//     x: Math.random() * (width - squareSide),
//     y: Math.random() * (height - squareSide),
//   }));
// };

// const points = randomPoints(7);

const points = [
  { x: 50, y: 50 },
  { x: 251, y: 776 },
  { x: 572, y: 341 },
  { x: 967, y: 132 },
  { x: 850, y: 700 },
  { x: 1408, y: 36 },
  { x: 1575, y: 780 },
];

export default function Illusion() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="bg-gradient">
          {[...Array(7).keys()].map(k => (
            <stop
              offset={(1 / 7) * k}
              stopColor={`hsl(${hue + 5 * k}, ${saturation}, ${lightness})`}
              key={k}
            />
          ))}
        </linearGradient>
        <linearGradient id="square-gradient">
          <stop stopColor={`hsl(${hue + 15}, ${saturation}, ${lightness})`} />
          <stop
            offset={1}
            stopColor={`hsl(${hue + 20}, ${saturation}, ${lightness})`}
          />
        </linearGradient>
        <filter id={`blur`}>
          <feGaussianBlur stdDeviation="10" in="SourceAlpha" result="blur" />
          <feOffset dx={-20} dy={10} in="blur" result="offset" />
          <feMerge>
            <feMergeNode in="offset" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width={width} height={height} fill="url(#bg-gradient)" />
      {/* <rect width={width} height={height} fill="hsl(205,100%,50%)" /> */}
      {points.map((c, k) => (
        <rect
          key={k}
          x={c.x}
          y={c.y}
          width={squareSide}
          height={squareSide}
          fill="url(#square-gradient)"
          // stroke={`black`}
          filter={`url(#blur)`}
        />
      ))}
    </svg>
  );
}

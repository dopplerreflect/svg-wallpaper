import React from 'react';

const width = 1920;
const height = 1080;
const vOrigin = height / 2;
const baseHue = 240;
const sampleRate = 128;
const sampleWidth = (width / sampleRate) * Math.PI;
const samples = [...Array(sampleRate + 1).keys()].map(
  i => (width / sampleRate) * i
);
const sampleY = (s: number) =>
  (height / 2) * Math.sin(((360 / width) * s * Math.PI) / 180);

export default function Wave() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor={`hsl(${baseHue - 60}, 100%, 2%)`} />
          <stop offset="95%" stopColor={`hsl(${baseHue}, 100%, 5%)`} />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#gradient)" />
      {samples.map(s => (
        <rect
          x={s - sampleWidth / 2}
          y={vOrigin - sampleWidth / 2 + sampleY(s)}
          width={sampleWidth}
          height={sampleWidth}
          fill={`hsla(${baseHue + 30}, 100%, 50%, 0.2)`}
          stroke={`hsl(${baseHue}, 100%, 50%)`}
        />
      ))}
    </svg>
  );
}

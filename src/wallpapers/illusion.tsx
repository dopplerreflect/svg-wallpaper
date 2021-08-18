import React from 'react';

const width = 1920;
const height = 1080;
const hue = 230;
const lightness = '33%';

export default function Illusion() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="bg-gradient">
          <stop offset={0} stopColor={`hsl(${hue}, 100%, ${lightness})`} />
          <stop
            offset={0.15}
            stopColor={`hsl(${hue + 5}, 100%, ${lightness})`}
          />
          <stop
            offset={0.3}
            stopColor={`hsl(${hue + 10}, 100%, ${lightness})`}
          />
          <stop
            offset={0.45}
            stopColor={`hsl(${hue + 15}, 100%, ${lightness})`}
          />
          <stop
            offset={0.6}
            stopColor={`hsl(${hue + 20}, 100%, ${lightness})`}
          />
          <stop
            offset={0.75}
            stopColor={`hsl(${hue + 25}, 100%, ${lightness})`}
          />
          <stop offset={1} stopColor={`hsl(${hue + 30}, 100%, ${lightness})`} />
        </linearGradient>
        <linearGradient id="square-gradient">
          <stop stopColor={`hsl(${hue + 15}, 100%, ${lightness})`} />
          <stop offset={1} stopColor={`hsl(${hue + 20}, 100%, ${lightness})`} />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#bg-gradient)" />
      <rect
        width={width / 7}
        height={width / 7}
        x={(width / 7) * 0}
        fill="url(#square-gradient)"
      />
      <rect
        width={width / 7}
        height={width / 7}
        x={(width / 7) * 0}
        fill="url(#square-gradient)"
      />
      <rect
        width={width / 7}
        height={width / 7}
        x={(width / 7) * 1}
        y={(width / 7) * 1}
        fill="url(#square-gradient)"
      />
      <rect
        width={width / 7}
        height={width / 7}
        x={(width / 7) * 2}
        y={(width / 7) * 2}
        fill="url(#square-gradient)"
      />
      <rect
        width={width / 7}
        height={width / 7}
        x={(width / 7) * 3}
        y={(width / 7) * 3}
        fill="url(#square-gradient)"
      />
      <rect
        width={width / 7}
        height={width / 7}
        x={(width / 7) * 4}
        y={(width / 7) * 2}
        fill="url(#square-gradient)"
      />
      <rect
        width={width / 7}
        height={width / 7}
        x={(width / 7) * 5}
        y={(width / 7) * 1}
        fill="url(#square-gradient)"
      />
      <rect
        width={width / 7}
        height={width / 7}
        x={(width / 7) * 6}
        y={(width / 7) * 0}
        fill="url(#square-gradient)"
      />
    </svg>
  );
}

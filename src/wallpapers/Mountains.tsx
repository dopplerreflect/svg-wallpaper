import React from 'react';
import SVG from './components/SVG';
const width = 1080;
const height = width;

const baseHue = 230;

export default function Mountain() {
  return (
    <SVG width={width} height={height}>
      <defs>
        <filter id="filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".005 0"
            numOctaves={5}
          />
          <feDisplacementMap in="SourceGraphic" scale="200" />
        </filter>
        <filter id="filter1">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".005 0"
            numOctaves={5}
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" scale="100" />
        </filter>
      </defs>
      <rect width={width} height={height} fill={`hsl(${baseHue}, 50%, 30%)`} />
      <rect
        id="range1"
        x={0}
        y={0 - height / 10}
        width={width}
        height={height / 2}
        fill={`hsl(${baseHue}, 50%, 20%)`}
        filter="url(#filter1)"
      />
      <rect
        id="range"
        x={0}
        y={0 - height / 5}
        width={width}
        height={height / 2}
        fill={`hsl(${baseHue}, 50%, 10%)`}
        filter="url(#filter)"
      />
      <use
        y="-100%"
        xlinkHref="#range1"
        transform="scale(1, -1)"
        filter="blur(5px)"
      />
      <use
        y="-100%"
        xlinkHref="#range"
        transform="scale(1, -1)"
        filter="blur(5px)"
      />
      <line
        x1={0}
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke={`hsl(${baseHue}, 50%, 10%)`}
        filter="blur(2px)"
      />
    </SVG>
  );
}

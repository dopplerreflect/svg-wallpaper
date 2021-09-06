import React from 'react';

const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;

export default function Text() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="yellow-blur-filter">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="blue-blur-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
        </filter>
        <symbol id="stroke">
          <text
            x={cx}
            y={cy}
            fill={`hsla(225, 100%, 50%, 0.15)`}
            fontSize={cy / 2}
            fontFamily="DejaVu Sans"
            fontWeight="bold"
            fontStyle="oblique"
            dominantBaseline="middle"
            textAnchor="middle"
            strokeWidth={16}
            strokeLinejoin="round"
            strokeLinecap="round"
            paintOrder="stroke fill"
          >
            doppler
          </text>
        </symbol>
      </defs>
      <rect width={width} height={height} fill={`hsl(225, 100%, 10%)`} />
      <g id="shaded-stroke" stroke={`hsl(45, 100%, 50%)`}>
        <use
          x="-4"
          y="-4"
          xlinkHref="#stroke"
          filter="url(#yellow-blur-filter)"
        />
        <use
          xlinkHref="#stroke"
          stroke={`hsl(225, 100%, 50%)`}
          filter="url(#blue-blur-filter)"
        />
        <use x="4" y="4" xlinkHref="#stroke" />
      </g>
    </svg>
  );
}

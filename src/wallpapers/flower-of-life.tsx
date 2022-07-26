import React from 'react';
import { pc } from '../utils';

const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const radius = height / 8;

const angles = [...Array(6).keys()].map(k => 60 * k);
const angles12 = [...Array(12).keys()].map(k => 30 * k);
const angles24 = [...Array(24).keys()].map(k => 15 * k);

const stroke = 'white';
const strokeWidth = 15;
const background = 'hsl(45, 50%, 80%)';

export default function FlowerOfLife() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`${width / 2 - height / 2} 0 ${height} ${height}`}
    >
      <defs>
        <linearGradient id="petalGradient">
          <stop offset="0%" stopColor="hsl(45, 100%, 50%)" />
          <stop offset="100%" stopColor="hsl(0, 100%, 50%)" />
        </linearGradient>
        <path
          id="petal"
          d={`M${pc(cx, cy, angles24[1], radius * 2.78).x},
          ${pc(cx, cy, angles24[1], radius * 2.78).y} 
          C${pc(cx, cy, angles24[1], radius * 4).x},
          ${pc(cx, cy, angles24[1], radius * 4).y} 
          ${pc(cx, cy, angles24[0], radius * 3.5).x},
          ${pc(cx, cy, angles24[0], radius * 3.5).y} 
          ${cx + radius * 4},${height / 2} 
          C${pc(cx, cy, angles24[0], radius * 3.5).x},
          ${pc(cx, cy, angles24[0], radius * 3.5).y} 
          ${pc(cx, cy, angles24[23], radius * 4).x},
          ${pc(cx, cy, angles24[23], radius * 4).y} 
          ${pc(cx, cy, angles24[23], radius * 2.78).x},
          ${pc(cx, cy, angles24[23], radius * 2.78).y} 
          `}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="url(#petalGradient)"
        />
        <filter id="blurrer">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
      </defs>

      <rect width={width} height={height} fill={background} />

      <g id="whole" transform={`rotate(-90, ${cx}, ${cy})`}>
        {angles12.map(
          // "hidden" outer petals
          a => (
            <use
              key={a}
              xlinkHref="#petal"
              transform={`rotate(${a + 15}, ${cx}, ${cy})`}
            />
          )
        )}
        {angles12.map(a => (
          // fully visible petals
          <use
            key={a}
            xlinkHref="#petal"
            transform={`rotate(${a}, ${cx}, ${cy})`}
          />
        ))}
        {/* center circle */}
        <g id="flowerOfLife">
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="hsl(45, 100%, 25%)"
            strokeWidth={strokeWidth}
          />
          {/* circles to mask background of petals */}
          {angles.map(a => (
            <circle
              key={a}
              cx={pc(cx, cy, a, radius * 2).x}
              cy={pc(cx, cy, a, radius * 2).y}
              r={radius}
              fill={background}
            />
          ))}
          {angles.map(a => (
            <g id={`radial-${a}`} key={a}>
              {/* second ring */}
              <circle
                cx={pc(cx, cy, a, radius * 2).x}
                cy={pc(cx, cy, a, radius * 2).y}
                r={radius}
                fill="none"
                stroke="hsl(45, 100%, 25%)"
                strokeWidth={strokeWidth}
              />
              {/* first ring */}
              <circle
                cx={pc(cx, cy, a, radius).x}
                cy={pc(cx, cy, a, radius).y}
                r={radius}
                fill="none"
                stroke="hsl(45, 100%, 25%)"
                strokeWidth={strokeWidth}
              />
              {/* second ring centered on vesica picses */}
              <circle
                cx={pc(cx, cy, a - 30, radius * 1.73).x}
                cy={pc(cx, cy, a - 30, radius * 1.73).y}
                r={radius}
                fill="none"
                stroke="hsl(45, 100%, 25%)"
                strokeWidth={strokeWidth}
              />
            </g>
          ))}
        </g>
        <g id="flowerOfLifeInner">
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={`hsl(45, 100%, 50%)`}
            strokeWidth={strokeWidth / 1.618}
          />
          {angles.map(a => (
            <g id={`radial-${a}`} key={a}>
              {/* second ring */}
              <circle
                cx={pc(cx, cy, a, radius * 2).x}
                cy={pc(cx, cy, a, radius * 2).y}
                r={radius}
                fill="none"
                stroke={`hsl(45, 100%, 50%)`}
                strokeWidth={strokeWidth / 1.618}
              />
              {/* first ring */}
              <circle
                cx={pc(cx, cy, a, radius).x}
                cy={pc(cx, cy, a, radius).y}
                r={radius}
                fill="none"
                stroke={`hsl(45, 100%, 50%)`}
                strokeWidth={strokeWidth / 1.618}
              />
              {/* second ring centered on vesica picses */}
              <circle
                cx={pc(cx, cy, a - 30, radius * 1.73).x}
                cy={pc(cx, cy, a - 30, radius * 1.73).y}
                r={radius}
                fill="none"
                stroke={`hsl(45, 100%, 50%)`}
                strokeWidth={strokeWidth / 1.618}
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

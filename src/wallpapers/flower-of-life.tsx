import React from 'react';
import { pc } from '../utils';

const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const radius = height / 8;

const angles = [...Array(6).keys()].map(k => 60 * k);
const angles24 = [...Array(24).keys()].map(k => 15 * k);

const stroke = 'hsl(45, 10%, 50%)';
const strokeWidth = 10;
const background = 'hsl(225, 100%, 25%)';

export default function FlowerOfLife() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <path
          id="petal"
          d={`M${pc(cx, cy, angles24[1], radius * 2.787).x},
          ${pc(cx, cy, angles24[1], radius * 2.787).y} 
          C${pc(cx, cy, angles24[1], radius * 4).x},
          ${pc(cx, cy, angles24[1], radius * 4).y} 
          ${pc(cx, cy, angles24[0], radius * 3.5).x},
          ${pc(cx, cy, angles24[0], radius * 3.5).y} 
          ${cx + radius * 4},${height / 2} 
          C${pc(cx, cy, angles24[0], radius * 3.5).x},
          ${pc(cx, cy, angles24[0], radius * 3.5).y} 
          ${pc(cx, cy, angles24[23], radius * 4).x},
          ${pc(cx, cy, angles24[23], radius * 4).y} 
          ${pc(cx, cy, angles24[23], radius * 2.787).x},
          ${pc(cx, cy, angles24[23], radius * 2.787).y} 
          `}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fill={background}
        />
      </defs>
      <rect width={width} height={height} fill={`hsl(225, 100%, 15%)`} />

      <g id="whole" transform={`rotate(-90, ${cx}, ${cy})`}>
        {angles24.map(
          a =>
            a % 30 === 0 && (
              <use
                key={a}
                xlinkHref="#petal"
                transform={`rotate(${a + 15}, ${cx}, ${cy})`}
              />
            )
        )}
        {angles24.map(
          a =>
            a % 30 === 0 && (
              <g>
                <use
                  key={a}
                  xlinkHref="#petal"
                  transform={`rotate(${a}, ${cx}, ${cy})`}
                />
                <circle
                  cx={pc(cx, cy, a, radius * 2).x}
                  cy={pc(cx, cy, a, radius * 2).y}
                  r={radius}
                  fill={background}
                />
              </g>
            )
        )}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill={background}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {angles.map(a => (
          <g id={`radial-${a}`} key={a}>
            <circle
              cx={pc(cx, cy, a, radius).x}
              cy={pc(cx, cy, a, radius).y}
              r={radius}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={pc(cx, cy, a, radius * 2).x}
              cy={pc(cx, cy, a, radius * 2).y}
              r={radius}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={pc(cx, cy, a - 30, radius * 1.73).x}
              cy={pc(cx, cy, a - 30, radius * 1.73).y}
              r={radius}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
            />
          </g>
        ))}
        {angles24.map(a => (
          <g id={`ray-${a}`} key={`ray-${a}`}>
            {/* <circle
              cx={pc(cx, cy, a, radius * 4).x}
              cy={pc(cx, cy, a, radius * 4).y}
              r={4}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
            /> */}
            <line
              x1={cx}
              y1={cy}
              x2={pc(cx, cy, a, radius * 4).x}
              y2={pc(cx, cy, a, radius * 4).y}
              stroke={stroke}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

import React from 'react';
import { pc } from '../utils';
const width = 500;
const height = width * 1.61803;
const cx = width / 2;
const cy = width / 2; // height * 0.61803 ** 2;
const r = height * 0.61803 ** 3;
const angles = [...Array(7).keys()].map(k => (360 / 7) * k - 90);

export default function BeeLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill="hsl(215, 100%, 70%)" />
      {/* <rect width={width} height={width} fill="white" /> */}
      <defs>
        <linearGradient id="top-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={`hsl(45, 100%, 50%)`} />
          <stop offset="100%" stopColor={`hsl(35, 100%, 50%)`} />
        </linearGradient>
        <radialGradient id="radial-gradient" r="0.5">
          <stop offset="0%" stopColor="hsl(35, 100%, 50%)" />
          <stop offset="100%" stopColor="hsl(37.5, 100%, 50%)" />
        </radialGradient>
        <linearGradient id="bottom-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={`hsl(35, 100%, 50%)`} />
          <stop offset="100%" stopColor={`hsl(45, 100%, 50%)`} />
        </linearGradient>
      </defs>
      <path
        d={`M${pc(cx, cy, angles[2], r).x},${pc(cx, cy, angles[2], r).y} L${
          pc(cx, cy, angles[3], r).x
        },${cy + r * 1.61803} L${pc(cx, cy, angles[4], r).x},${
          cy + r * 1.61803
        } L${pc(cx, cy, angles[5], r).x},${pc(cx, cy, angles[5], r).y} L${
          pc(cx, cy, angles[6], r).x
        },${pc(cx, cy, angles[6], r).y} L${pc(cx, cy, angles[0], r).x},${
          pc(cx, cy, angles[0], r).y
        } L${pc(cx, cy, angles[1], r).x},${pc(cx, cy, angles[1], r).y}Z`}
        // fill="url(#bottom-gradient)"
        fill="hsl(37.5,100%,50%)"
        strokeWidth="10"
        stroke="hsl(35,100%,50%)"
      />
      {/* <path
        d={`M${pc(cx, cy, angles[0], r).x},${
          pc(cx, cy, angles[0], r).y
        }, ${angles
          .map(a => `L${pc(cx, cy, a, r).x},${pc(cx, cy, a, r).y}`)
          .join(' ')} Z`}
        fill="url(#radial-gradient)"
      /> */}
      <path
        d={`M${pc(cx, cy, angles[2], r).x},${pc(cx, cy, angles[2], r).y} L${
          pc(cx, cy, 90, r - 19).x
        },${pc(cx, cy, 90, r - 19).y} L${pc(cx, cy, angles[5], r).x},${
          pc(cx, cy, angles[5], r).y
        } L${pc(cx, cy, angles[6], r).x},${pc(cx, cy, angles[6], r).y} L${
          pc(cx, cy, angles[0], r).x
        },${pc(cx, cy, angles[0], r).y} L${pc(cx, cy, angles[1], r).x},${
          pc(cx, cy, angles[1], r).y
        } Z`}
        fill="url(#radial-gradient)"
        strokeWidth="10"
        stroke="hsl(35,100%,50%)"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}

console.log({ r });

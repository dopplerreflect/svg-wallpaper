import React from 'react';
import { pc } from '../../utils';

export const PHI = (Math.sqrt(5) + 1) / 2;
export const PHIm1 = PHI - 1;
export const width = 1080;
export const height = 1080;
export const cx = width / 2;
export const cy = height / 2;
export const outerRadius = (height / 10) * 4;
export const numRings = 13;
export const gr = [...Array(numRings).keys()].map(
  k => outerRadius * PHIm1 ** k
);
export const sr = [...Array(13).keys()].map(
  k => outerRadius - outerRadius * PHIm1 ** k
);
export const numAngles = 60;
export const angles = [...Array(numAngles).keys()].map(
  k => (360 / numAngles) * k
);

export const strokeColor = 'hsl(30, 100%, 50%)';
export const strokeWidth = (height / 1080) * 1;

export const p = (a: number, r: number) => ({
  x: pc(cx, cy, a, r).x,
  y: pc(cx, cy, a, r).y,
});

export default function Blueprint() {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect width={width} height={height} fill="black" />

      <Rays />
      <RayLegend />
      <GoldenRings />
      <GoldenLegend />
      <SpherishRings />
      <SpherishLegend />
    </svg>
  );
}

export const Rays = () => (
  <>
    {angles.map(a => (
      <line
        key={a}
        x1={pc(cx, cy, a, gr[gr.length - 1]).x}
        y1={pc(cx, cy, a, gr[gr.length - 1]).y}
        x2={pc(cx, cy, a, gr[0]).x}
        y2={pc(cx, cy, a, gr[0]).y}
        stroke={strokeColor}
      />
    ))}
  </>
);

export const RayLegend = () => (
  <>
    {angles.map((a, i) => (
      <text
        key={i}
        x={pc(cx, cy, a, gr[0] + 10).x}
        y={pc(cx, cy, a, gr[0] + 10).y}
        dominantBaseline="middle"
        textAnchor="middle"
        fill={strokeColor}
      >
        {i}
      </text>
    ))}
  </>
);
export const GoldenRings = () => (
  <>
    {gr.map(r => (
      <circle key={r} cx={cx} cy={cy} r={r} stroke={strokeColor} fill="none" />
    ))}
  </>
);

export const GoldenLegend = () => (
  <>
    {gr.map((r, i) => (
      <g key={r} id={`spherishRing-${r}`}>
        <line
          key={r}
          x1={cx}
          y1={cy - r}
          x2={cx + gr[0] + 40}
          y2={cy - r}
          stroke={strokeColor}
        />
        <text
          x={cx + gr[0] + 50}
          y={cy - r}
          fill={strokeColor}
          dominantBaseline="middle"
        >
          {i}
        </text>
      </g>
    ))}
  </>
);

export const SpherishRings = () => (
  <>
    {sr.map((r, i) => (
      <circle key={r} cx={cx} cy={cy} r={r} stroke={strokeColor} fill="none" />
    ))}
  </>
);

export const SpherishLegend = () => (
  <>
    {sr.map((r, i) => (
      <g key={r} id={`spherishRing-${r}`}>
        <line
          key={r}
          x1={cx - gr[0] - 40}
          y1={cy - r}
          x2={cx}
          y2={cy - r}
          stroke={strokeColor}
        />
        <text
          x={cx - gr[0] - 60}
          y={cy - r}
          fill={strokeColor}
          dominantBaseline="middle"
        >
          {i}
        </text>
      </g>
    ))}
  </>
);

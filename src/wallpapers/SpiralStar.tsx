import React from 'react';
import Star from './components/star';
const PHI = (1 + Math.sqrt(5)) / 2;
const negPHI = PHI - 1;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const radii = Array.from(Array(12)).map((_, i) => cy * negPHI ** i);
const angles = Array.from(Array(10)).map((_, i) => i * (360 / 10));
const pc = (angle: number, radius: number) => {
  return {
    x: cx + radius * Math.cos(angle * (Math.PI / 180)),
    y: cy + radius * Math.sin(angle * (Math.PI / 180)),
  };
};
export const p = (angle: number, radius: number) => {
  return {
    x: cx + radius * Math.cos(angle * (Math.PI / 180)),
    y: cy + radius * Math.sin(angle * (Math.PI / 180)),
  };
};

export default function SpiralStar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor="hsl(0, 100%, 2%)" />
          <stop offset="95%" stopColor="hsl(30, 100%, 10%)" />
        </linearGradient>
        <clipPath id="circleClip">
          <circle cx={cx} cy={cy} r={cy - 1} />
        </clipPath>
      </defs>
      <rect width={width} height={height} fill="url(#gradient)" />
      <g id="sunflower-bg">
        {[...Array(2160).keys()].map(i => {
          let angle = Math.round((i * 137.50776405003785) % 360);
          let r = ((cy - cy * 0.83) / 180) * i;
          return (
            <g key={i}>
              <Star
                cy={p(angle, r).y}
                cx={p(angle, r).x}
                r={5 + r / 72}
                rotate={angle}
                // stroke={`hsl(${(r * 137.5) / 2160 + 200}, 100%, 33%)`}
                stroke={`hsl(${300 - i / 24}, 100%, 50%)`}
                strokeWidth={0.75 + r / 360}
                fill={`hsl(${180 - i / 24}, 100%, 25%)`}
                fillOpacity={0.5}
              />
            </g>
          );
        })}
      </g>
      <g id="circles" transform={`rotate(-90, ${cx}, ${cy})`}>
        {radii.map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            stroke={`hsl(45, 100%, 50%)`}
            strokeWidth={2}
            fill="none"
          />
        ))}
      </g>
      <g id="star" transform={`rotate(-90, ${cx}, ${cy})`}>
        <path
          d={`M${pc(angles[0], radii[0]).x},${pc(angles[0], radii[0]).y} ${[
            ...Array(angles.length - 1).keys(),
          ]
            .map(
              i =>
                `L${pc(angles[i + 1], i % 2 === 0 ? radii[2] : radii[0]).x},${
                  pc(angles[i + 1], i % 2 === 0 ? radii[2] : radii[0]).y
                }`
            )
            .join(' ')} Z`}
          stroke="hsl(45, 100%, 50%)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="bevel"
          transform={`rotate(0, ${cx}, ${cy})`}
          fill="hsl(240, 100%, 20%)"
          fillOpacity={0.5}
        />
      </g>
      <g id="sunflower" clipPath="url(#circleClip)">
        {[...Array(1080).keys()].map(i => {
          let angle = Math.round((i * 137.50776405003785) % 360);
          let r = ((cy - cy * (PHI - 1)) / 360) * i;
          return (
            <g key={i}>
              <Star
                cy={p(angle, r).y}
                cx={p(angle, r).x}
                r={5 + r / 48}
                rotate={angle}
                // stroke={`hsl(${(r * 137.5) / 360 + 300}, 100%, 75%)`}
                stroke={`hsl(${90 - i / 15}, 100%, 50%)`}
                strokeWidth={0.75 + r / 180}
                fill={`hsl(${(r * 137.5) / 2160 + 0}, 100%, 20%)`}
                fillOpacity={1}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

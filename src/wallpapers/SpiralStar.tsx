import React from 'react';
import Star from './components/star';
import useSaveSVG from '@dopplerreflect/use-save-svg';
const PHI = (1 + Math.sqrt(5)) / 2;
const negPHI = PHI - 1;
const width = 6000;
const height = 12000;
const cx = width / 2;
const cy = height / 2;
const radii = Array.from(Array(12)).map(
  (_, i) => (width / (PHI * 2)) * negPHI ** i
);
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
  const svgRef = useSaveSVG();
  return (
    <svg
      ref={svgRef}
      id='Manufactory-Main'
      xmlns='http://www.w3.org/2000/svg'
      // width={width}
      // height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id='gradient' gradientTransform='rotate(90)'>
          <stop offset='0%' stopColor='hsl(0, 100%, 100%)' />
          <stop offset='100%' stopColor='hsl(225, 100%, 90%)' />
        </linearGradient>
        <clipPath id='circleClip'>
          <circle cx={cx} cy={cy} r={width / (PHI * 2)} />
          {/* <circle cx={cx} cy={cy} r={width / 2} /> */}
        </clipPath>
        <mask id='circleMask'>
          <rect width={width} height={height} fill='white' />
          <circle cx={cx} cy={cy} r={width / (PHI * 2)} fill='black' />
        </mask>
      </defs>
      <rect width={width} height={height} fill='white' />
      <g id='sunflower-bg' mask='url(#circleMask)'>
        {[...Array(2160).keys()].map(i => {
          let angle = Math.round((i * 137.50776405003785) % 360);
          let r = ((cy - cy * 0.83) / 320) * i;
          return (
            <g key={i}>
              <Star
                cy={p(angle, r).y}
                cx={p(angle, r).x}
                r={5 + r / 48}
                rotate={angle}
                // stroke={`hsl(${(r * 137.5) / 2160 + 200}, 100%, 33%)`}
                stroke={`hsl(${240 - i / 36}, 100%, 50%)`}
                strokeWidth={0.75 + r / 360}
                fill={`hsl(${240 - i / 36}, 100%, 50%)`}
                fillOpacity={0.5}
              />
            </g>
          );
        })}
      </g>
      <g id='circles' transform={`rotate(-90, ${cx}, ${cy})`}>
        {radii.map((r, i) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            stroke={`hsl(30, 100%, 50%)`}
            strokeWidth={height / 1080}
            fill='none'
          />
        ))}
      </g>
      <g id='star' transform={`rotate(-90, ${cx}, ${cy})`}>
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
          stroke='hsl(60, 100%, 50%)'
          strokeWidth={width / 1080}
          strokeLinecap='round'
          strokeLinejoin='bevel'
          transform={`rotate(0, ${cx}, ${cy})`}
          fill='hsl(45, 100%, 50%)'
          fillOpacity={0.125}
        />
      </g>
      <g id='sunflower' clipPath='url(#circleClip)'>
        {[...Array(1080).keys()].map(i => {
          let angle = Math.round((i * 137.50776405003785) % 360);
          // let r = ((cy - cy * (PHI - 1)) / 1250) * i;
          let r = ((cy - cy * 0.83) / 320) * i;

          return (
            <g key={i}>
              <Star
                cy={p(angle, r).y}
                cx={p(angle, r).x}
                r={5 + r / 16}
                rotate={angle}
                // stroke={`hsl(${(r * 137.5) / 360 + 300}, 100%, 75%)`}
                stroke={`hsl(${90 - i / 15}, 100%, 50%)`}
                strokeWidth={0.75 + r / 180}
                fill={`hsl(${270 - i / 15}, 100%, 50%)`}
                // fill={`hsl(${(r * 137.5) / 2160 + 0}, 100%, 20%)`}
                fillOpacity={1}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

import React from 'react';
import Star from './components/star';
import useSaveSVG from '@dopplerreflect/use-save-svg';
const PHI = (1 + Math.sqrt(5)) / 2;
const width = 8400;
const height = 9000;
const cx = width / 2;
const cy = height / 2;
const radii = Array.from(Array(12)).map((_, i) => (width / (PHI * 2)) * (PHI - 1) ** i);
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
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id='gradient' gradientTransform='rotate(90)'>
          <stop offset='0%' stopColor='hsl(0, 100%, 100%)' />
          <stop offset='100%' stopColor='hsl(225, 100%, 90%)' />
        </linearGradient>
        <clipPath id='circleClip'>
          <circle cx={cx} cy={cy} r={width / (PHI * 2)} />
        </clipPath>
        <mask id='circleMask'>
          <rect width={width} height={height} fill='white' />
          <circle cx={cx} cy={cy} r={width / (PHI * 2)} fill='black' />
        </mask>
      </defs>
      <g id='sunflower-bg' mask='url(#circleMask)' fillOpacity={0.5}>
        {[...Array(2500).keys()].map(i => {
          let angle = Math.round((i * (360 - 360 * (PHI - 1))) % 360);
          let r = ((cy - cy * 0.83) / 320) * i;
          return (
            <g key={i}>
              <Star
                cy={p(angle, r).y}
                cx={p(angle, r).x}
                r={r / 36}
                rotate={angle}
                stroke={`hsl(${240 - i / 36}, 100%, 50%)`}
                strokeWidth={0.75 + r / 360}
                fill={`hsl(${240 - i / 36}, 100%, 50%)`}
              />
            </g>
          );
        })}
      </g>
      <g
        id='circles'
        transform={`rotate(-90, ${cx}, ${cy})`}
        stroke={`hsl(30, 100%, 50%)`}
        strokeWidth={height / 1080}
        fill='none'
      >
        {radii.map((r, i) => (
          <circle key={r} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <g
        id='star'
        transform={`rotate(-90, ${cx}, ${cy})`}
        stroke='hsl(60, 100%, 50%)'
        strokeLinecap='round'
        strokeLinejoin='bevel'
        fill='hsl(45, 100%, 50%)'
      >
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
          transform={`rotate(0, ${cx}, ${cy})`}
          strokeWidth={width / 1080}
          fillOpacity={0.125}
        />
      </g>
      <g id='sunflower' clipPath='url(#circleClip)'>
        {/* {[...Array(1250).keys()].map(i => {
          let angle = Math.round((i * (360 - 360 * (PHI - 1))) % 360);
          let r = ((cy - cy * 0.83) / 360) * i;
          return (
            <g key={i}>
              <Star
                cy={p(angle, r).y}
                cx={p(angle, r).x}
                r={r / 36}
                rotate={angle}
                stroke={`hsl(${90 - i / 15}, 100%, 50%)`}
                strokeWidth={0.75 + r / 180}
                fill={`hsl(${270 - i / 15}, 100%, 50%)`}
                fillOpacity={1}
              />
            </g>
          );
        })} */}
        {[...Array(1250).keys()].map(i => {
          let angle = Math.round((i * (360 - 360 * (PHI - 1))) % 360);
          let r = ((cy - cy * 0.83) / 320) * i;
          return (
            <g key={i}>
              <Star
                cy={p(angle, r).y}
                cx={p(angle, r).x}
                r={r / 36}
                rotate={angle}
                stroke={`hsl(${240 - i / 36}, 100%, 50%)`}
                strokeWidth={0.75 + r / 360}
                fill={`hsl(${45 - i / 36}, 100%, 50%)`}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

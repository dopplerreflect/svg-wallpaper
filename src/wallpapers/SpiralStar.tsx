import React from 'react';
import Star from './components/star';
import useSaveSVG from '@dopplerreflect/use-save-svg';
import { outerRadius } from './components/Blueprint';
const PHI = (1 + Math.sqrt(5)) / 2;
const width = 1080;
const height = 2375;
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
      // viewBox={`0 0 ${width} ${height}`}
      viewBox='0 768 1080 1080'
    >
      <defs>
        <linearGradient id='gradient' gradientTransform='rotate(90)'>
          <stop offset='0%' stopColor='hsl(280, 100%, 50%)' />
          <stop offset='100%' stopColor='hsl(220, 100%, 50%)' />
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
        <StarField startHue={360} endHue={180} outerBounds={cy} />
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
      <Star cx={cx} cy={cy} r={radii[0]} fill='url(#gradient)' fillOpacity={0.75} />
      <g id='sunflower' clipPath='url(#circleClip)' fillOpacity={0.5}>
        <StarField startHue={45} endHue={0} outerBounds={radii[0] + radii[0] * 0.1} />
      </g>
    </svg>
  );
}

type StarFieldProps = {
  outerBounds: number;
  startHue: number;
  endHue: number;
};
const StarField = ({ outerBounds, startHue, endHue }: StarFieldProps) => {
  let i = 0;
  let r = 0;
  let paramsArray = [];
  while (r < outerBounds) {
    i++;
    let angle = (i * (360 - 360 * (PHI - 1))) % 360;
    r = ((cy - cy * 0.9) / 320) * i;
    const c = p(angle, r);
    paramsArray.push({ i, c, r, angle });
  }
  console.log(paramsArray.length);
  const stars = paramsArray.map((p, i) => (
    <Star
      key={i}
      cy={p.c.y}
      cx={p.c.x}
      r={p.r / (13 + 0.0104 * i)}
      rotate={p.angle}
      stroke={`hsl(${
        startHue - Math.abs((startHue - endHue) / paramsArray.length) * i
      }, 100%, 50%)`}
      strokeWidth={0.75 + p.r / 360}
      fill={`hsl(${
        startHue - Math.abs((startHue - endHue) / paramsArray.length) * i
      }, 100%, 50%)`}
    />
  ));
  return <g id='StarField'>{stars}</g>;
};

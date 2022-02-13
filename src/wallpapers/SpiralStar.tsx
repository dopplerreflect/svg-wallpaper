import React from 'react';
import Star from './components/star';
import useSaveSVG from '@dopplerreflect/use-save-svg';
const PHI = (1 + Math.sqrt(5)) / 2;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
// const radii = Array.from(Array(12)).map((_, i) => (width / (PHI * 2)) * (PHI - 1) ** i);
const radii = Array.from(Array(12)).map((_, i) => cy * (PHI - 1) ** i);
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
      // viewBox='0 768 1024 1024'
    >
      <defs>
        <clipPath id='starClip'>
          <Star cx={cx} cy={cy} r={radii[0]} />
        </clipPath>
        <mask id='outsideStarMask'>
          <circle cx={cx} cy={cy} r={radii[0]} fill='white' />
          <Star cx={cx} cy={cy} r={radii[0]} fill='black' />
        </mask>
        <mask id='circleMask'>
          <rect width={width} height={height} fill='white' />
          <circle cx={cx} cy={cy} r={cy} fill='black' />
        </mask>

        <filter id='circleHueShift'>
          <feColorMatrix type='hueRotate' values='0' />
        </filter>
        <filter id='starHueShift'>
          <feColorMatrix type='hueRotate' values='0' />
        </filter>
        <g id='starfield'>
          <StarField startHue={0} endHue={360} outerBounds={cx} />
        </g>
      </defs>

      <rect x={0} y={0} width={width} height={height} fill='black' />

      <Star
        cx={cx}
        cy={cy}
        r={radii[0]}
        fillOpacity={0.5}
        fill='hsl(270, 100%, 50%)'
        stroke='hsl(30, 100%, 50%)'
        strokeWidth={height / 1080}
      />

      <g id='circles' stroke={`hsl(30, 100%, 50%)`} strokeWidth={height / 1080} fill='none'>
        {radii.map(r => (
          <circle key={r} cx={cx} cy={cy} r={r} />
        ))}
      </g>

      <g id='sunflower-bg' mask='url(#circleMask)' fillOpacity={1}>
        <use xlinkHref='#starfield' />
      </g>

      <g id='sunflowerInCircle' mask='url(#outsideStarMask)' fillOpacity={1}>
        <use xlinkHref='#starfield' filter='url(#circleHueShift)' />
      </g>

      <g id='sunflowerInStar' clipPath='url(#starClip)' fillOpacity={1}>
        <use xlinkHref='#starfield' filter='url(#starHueShift)' />
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
  while (r < outerBounds + outerBounds * 0.2) {
    i++;
    let angle = (i * (360 - 360 * (PHI - 1))) % 360;
    r = ((cy - cy * 0.9) / 144) * i;
    const c = p(angle, r);
    paramsArray.push({ i, c, r, angle });
  }
  console.log(paramsArray.length);
  const stars = paramsArray.map((p, i) => (
    <Star
      key={i}
      cy={p.c.y}
      cx={p.c.x}
      r={p.r / (13 + 0.015 * i)}
      rotate={p.angle}
      // stroke={`hsl(${
      //   startHue - Math.abs((startHue + endHue) / paramsArray.length) * i * 10
      // }, 25%, 50%)`}
      stroke='hsl(0, 0%, 50%'
      strokeWidth={0.75 + p.r / 540}
      // fill={`hsl(${i % 2 === 0 ? i % 21 : (i % 34) - 120}, 100%, 50%)`}
      fill={`hsl(${i % 21 === 0 ? 60 : i % 13 === 0 ? 0 : i % 8 === 0 ? 45 : 270}, 100%, 50%)`}
    />
  ));
  return <g id='StarField'>{stars}</g>;
};

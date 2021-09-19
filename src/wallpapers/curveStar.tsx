import React from 'react';
import { pc } from '../utils';
import Star from './components/star';

const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;

const PHI = (Math.sqrt(5) + 1) / 2;
const NPHI = PHI - 1;
const R = cy;

const Angles = [...Array(5).keys()].map(k => 72 * k);

const Points = Angles.map(a => ({
  x: pc(cx, cy, a, R).x,
  y: pc(cx, cy, a, R).y,
}));

export default function CurveStar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <g id="ray">
          <path
            d={`M${Points[0].x},${Points[0].y} C${Points[1].x},${Points[1].y} ${Points[3].x},${Points[3].y} ${Points[2].x},${Points[2].y} Z`}
          />
          <path
            d={`M${Points[0].x},${Points[0].y}   C${Points[4].x},${Points[4].y} ${Points[2].x},${Points[2].y} ${Points[3].x},${Points[3].y} `}
          />
        </g>
      </defs>
      <rect width={width} height={height} fill={`hsl(225, 100%, 10%)`} />
      {/* <circle cx={cx} cy={cy} r={R} stroke="white" fill="none" /> */}
      <g transform={`rotate(-90, ${cx}, ${cy})`}>
        {Angles.map(a => (
          <use
            key={a}
            xlinkHref="#ray"
            transform={`rotate(${a}, ${cx}, ${cy})`}
            // stroke={`white`}
            strokeWidth={1}
            fill={`hsl(45, 100%, 50%)`}
            fillOpacity={0.75}
          />
        ))}
        {Angles.map(a => (
          <use
            key={a}
            xlinkHref="#ray"
            transform={`rotate(${a}, ${cx}, ${cy})`}
            fill="none"
            stroke={`hsl(225, 100%, 10%)`}
            strokeWidth={5}
          />
        ))}
      </g>
    </svg>
  );
}

/*
 */

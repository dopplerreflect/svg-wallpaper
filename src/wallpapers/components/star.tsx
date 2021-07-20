import React from 'react';

type StarProps = {
  cx: number;
  cy: number;
  r: number;
  transform?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
};
const Star = ({ cx, cy, r, ...props }: StarProps) => {
  const pc = (angle: number, radius: number) => {
    return {
      x: cx + radius * Math.cos(angle * (Math.PI / 180)),
      y: cy + radius * Math.sin(angle * (Math.PI / 180)),
    };
  };
  return (
    <path
      d={`M${pc(0, r).x},${pc(0, r).y} ${[...Array(10).keys()]
        .map(k => (360 / 10) * k)
        .slice(1, 10)
        .map(
          a =>
            `L${pc(a, a % 72 === 0 ? r : r * 0.61803 ** 2).x},${
              pc(a, a % 72 === 0 ? r : r * 0.61803 ** 2).y
            }`
        )
        .join(' ')} Z`}
      fill={props.fill}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      transform={props.transform}
    />
  );
};
export default Star;

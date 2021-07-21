import React from 'react';

type StarProps = {
  cx: number;
  cy: number;
  r: number;
  upright?: boolean;
  transform?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  filter?: string;
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
      d={`M${pc(props.upright ? 270 : 0, r).x},${
        pc(props.upright ? 270 : 0, r).y
      } ${[...Array(10).keys()]
        .map(k => (360 / 10) * k)
        .map(
          a =>
            `L${
              pc(
                props.upright ? a - 90 : a,
                a % 72 === 0 ? r : r * 0.61803 ** 2
              ).x
            },${
              pc(
                props.upright ? a - 90 : a,
                a % 72 === 0 ? r : r * 0.61803 ** 2
              ).y
            }`
        )
        .join(' ')} Z`}
      fill={props.fill}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      transform={props.transform}
      filter={props.filter}
    />
  );
};
export default Star;

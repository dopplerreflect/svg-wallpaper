import React from 'react';

type StarProps = {
  cx: number;
  cy: number;
  r: number;
  rotate?: number;
  upright?: boolean;
  transform?: string;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  filter?: string;
  style?: object;
};
const Star = ({ cx, cy, r, rotate = -90, ...props }: StarProps) => {
  const pc = (angle: number, radius: number) => {
    return {
      x: cx + radius * Math.cos(angle * (Math.PI / 180)),
      y: cy + radius * Math.sin(angle * (Math.PI / 180)),
    };
  };
  return (
    <path
      d={`M${Math.round(
        pc(rotate ? rotate : props.upright ? 270 : 0, r).x
      )},${Math.round(pc(rotate ? rotate : props.upright ? 270 : 0, r).y)} ${[
        ...Array(10).keys(),
      ]
        .map(k => (360 / 10) * k)
        .map(
          a =>
            `L${Math.round(
              pc(
                rotate ? rotate + a : props.upright ? a - 90 : a,
                a % 72 === 0 ? r : r * 0.61803 ** 2
              ).x
            )},${Math.round(
              pc(
                rotate ? rotate + a : props.upright ? a - 90 : a,
                a % 72 === 0 ? r : r * 0.61803 ** 2
              ).y
            )}`
        )
        .join(' ')} Z`}
      fill={props.fill}
      fillOpacity={props.fillOpacity}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      transform={props.transform}
      filter={props.filter}
      style={props.style}
    />
  );
};
export default Star;

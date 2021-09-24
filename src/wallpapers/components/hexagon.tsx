import React from 'react';

type HexagonProps = {
  cx: number;
  cy: number;
  r: number;
  rotate?: number;
  transform?: string;
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  filter?: string;
  style?: object;
  mask?: string;
};

const Hexagon = ({ cx, cy, r, rotate = 0, ...props }: HexagonProps) => {
  const pc = (angle: number, radius: number) => {
    return {
      x: cx + radius * Math.cos(angle * (Math.PI / 180)),
      y: cy + radius * Math.sin(angle * (Math.PI / 180)),
    };
  };
  const angles = [...Array(6).keys()].map(k => 60 * k);
  return (
    <path
      d={[
        `M${pc(rotate ? rotate : 0, r).x},${pc(rotate ? rotate : 0, r).y}`,
        angles
          .map(a => [
            `L${pc(rotate ? rotate + a : a, r).x},${
              pc(rotate ? rotate + a : a, r).y
            }`,
          ])
          .join(),
        'Z',
      ].join()}
      fill={props.fill}
      fillOpacity={props.fillOpacity}
      stroke={props.stroke}
      strokeWidth={props.strokeWidth}
      transform={props.transform}
      filter={props.filter}
      style={props.style}
      mask={props.mask}
    />
  );
};

export default Hexagon;

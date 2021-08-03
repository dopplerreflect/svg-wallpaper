import React from 'react';

const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;

type NextPoint = [angle: number, length: number];
type TurtlePath = NextPoint[];
type Coordinate = { x: number; y: number };
type Path = Coordinate[];

function getEndpoint(
  startX: number,
  startY: number,
  angle: number,
  length: number
): Coordinate {
  const radians = (angle * Math.PI) / 180;
  return {
    x: startX + length * Math.cos(radians),
    y: startY + length * Math.sin(radians),
  };
}

const buildPath = (startPoint: Coordinate, turtlePath: TurtlePath): Path => {
  let previousPoint = startPoint;
  return [
    { x: startPoint.x, y: startPoint.y },
    ...turtlePath.map(p => {
      const [angle, length] = p;
      const nextPoint = getEndpoint(
        previousPoint.x,
        previousPoint.y,
        angle,
        length
      );
      previousPoint = nextPoint;
      return nextPoint;
    }),
  ];
};

const turtlePath: TurtlePath = [
  [0, 100],
  [60, 300],
  [120, 100],
  [180, 300],
  [240, 100],
  [300, 300],
  [60, 300],
  [0, 100],
  [180, 400],
];
const path = buildPath({ x: cx, y: cy }, turtlePath);
console.log({ path });

export default function Something() {
  return (
    <svg xmlns="https://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill="hsl(240, 100%, 20%)" />
      <path
        d={path
          .map((c, i) => (i === 0 ? 'M' : 'L') + `${c.x},${c.y}`)
          .join(' ')}
        stroke="white"
        strokeWidth="3"
        fill="transparent"
      />
      <line x1={cx} y1={0} x2={cx} y2={height} stroke="white" />
      <line x1={0} y1={cy} x2={width} y2={cy} stroke="white" />
    </svg>
  );
}

import React from 'react';
import Star from './components/star';

const width = 1920;
const height = width / 1.9;
const stripeHeight = height / 13;
const unionWidth = (width / 5) * 2;
const unionHeight = stripeHeight * 7;
const red = '#bb133e';
const blue = '#002147';

export default function SVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <rect width={width} height={height} fill="white" />
      {[...Array(13).keys()].map(k => (
        <rect
          key={k}
          y={stripeHeight * k}
          width={width}
          height={stripeHeight}
          fill={k % 2 === 0 ? red : 'none'}
        />
      ))}
      <rect width={unionWidth} height={unionHeight} fill={blue} />
      {[...Array(9).keys()].map(k => (
        <StripeRow
          key={k}
          oddRow={k % 2 === 1}
          transform={`translate(${k % 2 === 1 ? -(height * 0.063) : 0}, ${
            k * height * 0.054
          })`}
        />
      ))}
    </svg>
  );
}
type StripeRowProps = {
  transform?: string;
  oddRow?: boolean;
};
const StripeRow = ({ transform, oddRow }: StripeRowProps) => (
  <g transform={transform}>
    {[...Array(6).keys()].map(k => {
      if (oddRow && k === 0) return null;
      return (
        <Star
          key={k}
          upright
          cx={height * 0.063 + k * height * 0.063 * 2}
          cy={height * 0.054}
          r={(height * 0.0616) / 2}
          fill="white"
        />
      );
    })}
  </g>
);

import React from 'react';

const PHI = (Math.sqrt(5) + 1) / 2;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const angles = (count: number) =>
  [...Array(count).keys()].map(i => (360 / count) * i);

const pc = (angle: number) => ({
  x: cx + (cy / 2) * Math.cos(angle * (Math.PI / 180)),
  y: cy + (cy / 2) * Math.sin(angle * (Math.PI / 180)),
});

const p = (angle: number, radius: number) => ({
  x: cx + radius * Math.cos(angle * (Math.PI / 180)),
  y: cy + radius * Math.sin(angle * (Math.PI / 180)),
});

export default function Test() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <g id="right-curve">
          <path
            d={[
              `M${cx},${cy}`,
              ...[...Array(40).keys()]
                .map(i => i + 1)
                .map(i =>
                  [
                    `L${p(i * PHI ** 4, (cy / 40) * i).x},`,
                    `${p(i * PHI ** 4, (cy / 40) * i).y}`,
                  ].join(' ')
                ),
            ].join(' ')}
            fill="none"
            stroke="hsl(45, 100%, 50%)"
          />
        </g>
        <g id="left-curve">
          <path
            d={[
              `M${cx},${cy}`,
              ...[...Array(40).keys()]
                .map(i => i + 1)
                .map(
                  i =>
                    `L${p(i - i * PHI ** 4, (cy / 40) * i).x},${
                      p(i - i * PHI ** 4, (cy / 40) * i).y
                    } `
                ),
            ].join(' ')}
            fill="none"
            stroke="hsl(45, 100%, 50%)"
            strokeWidth="1"
          />
        </g>

        <radialGradient
          id="radial-gradient"
          cx={cx}
          cy={cy}
          r={cy + 50}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="hsl(285,100%,33%)" />
          <stop offset="100%" stopColor="hsl(285,100%,5%)" />
        </radialGradient>

        <filter id="blur">
          <feGaussianBlur stdDeviation="5" in="SourceAlpha" result="blur" />
          <feOffset in="blur" dx="0" dy="10" result="offsetBlur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <mask id="radial-gradient-mask">
          <circle cx={cx} cy={cy} r={cy} fill="url(#radial-gradient)" />
        </mask>
      </defs>
      <rect width={width} height={height} fill={`url(#radial-gradient)`} />
      <g id="pinecone" filter="url(#blur)">
        {angles(5).map(a => (
          <use
            key={a}
            href="#right-curve"
            transform={`rotate(${a}, ${cx}, ${cy})`}
          />
        ))}
        {angles(8).map(a => (
          <use
            key={a}
            href="#left-curve"
            transform={`rotate(${a}, ${cx}, ${cy})`}
          />
        ))}
        <circle
          cx={cx}
          cy={cy}
          r={cy}
          stroke="hsl(35, 50%, 50%)"
          strokeWidth="4"
          fill="none"
        />
      </g>
    </svg>
  );
}

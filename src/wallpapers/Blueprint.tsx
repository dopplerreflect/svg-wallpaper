import React from 'react';
import Star from './components/star';

import {
  width,
  height,
  PHI,
  PHIm1,
  cx,
  cy,
  p,
  angles,
  sr,
  gr,
  strokeColor,
  strokeWidth,
  Rays,
  RayLegend,
  GoldenRings,
  GoldenLegend,
  SpherishRings,
  SpherishLegend,
} from './components/Blueprint';

export default function Blueprint() {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id="blueprintPaper">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={PHIm1 ** 4}
            stitchTiles="stitch"
            seed="2"
          />
          <feSpecularLighting
            specularConstant={PHI ** 2}
            specularExponent={PHI ** 3}
            lightingColor={`hsl(${240}, 50%, 33%)`}
            surfaceScale={PHI}
          >
            <fePointLight x={cx} y={cy} z={cy / 8} />
          </feSpecularLighting>
        </filter>
        <linearGradient id="frontPetalGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={`hsl(60, 100%, 50%)`} />
          <stop offset="75%" stopColor={`hsl(0, 100%, 50%)`} />
        </linearGradient>
        <linearGradient id="rearPetalGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={`hsl(240, 100%, 50%)`} />
          <stop offset="75%" stopColor={`hsl(180, 100%, 50%)`} />
        </linearGradient>
        <path
          id="petal"
          d={[
            `M${p(angles[45], gr[0]).x},${p(angles[45], gr[0]).y}`,
            `C${p(angles[45], sr[7]).x},${p(angles[45], sr[7]).y}`,
            ` ${p(angles[46], sr[7]).x},${p(angles[46], sr[7]).y}`,
            ` ${p(angles[46], sr[5]).x},${p(angles[46], sr[5]).y}`,
            `S${p(angles[45], sr[3]).x},${p(angles[45], sr[3]).y}`,
            ` ${p(angles[45], sr[1]).x},${p(angles[45], sr[1]).y}`,
            `M${p(angles[45], gr[0]).x},${p(angles[45], gr[0]).y}`,
            `C${p(angles[45], sr[7]).x},${p(angles[45], sr[7]).y}`,
            ` ${p(angles[44], sr[7]).x},${p(angles[44], sr[7]).y}`,
            ` ${p(angles[44], sr[5]).x},${p(angles[44], sr[5]).y}`,
            `S${p(angles[45], sr[3]).x},${p(angles[45], sr[3]).y}`,
            ` ${p(angles[45], sr[1]).x},${p(angles[45], sr[1]).y}`,
          ].join('')}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          // fill="none"
        />
        <mask id="centerCircleMask">
          <rect width={width} height={height} fill="white" />
          <circle cx={cx} cy={cy} r={gr[4]} fill="black" />
        </mask>
        <filter id="mandala">
          <feFlood
            result="flood"
            floodColor="hsl(0, 100%, 25%)"
            floodOpacity="1"
          />
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="mask"
          />
          <feMorphology
            in="mask"
            operator="dilate"
            radius={strokeWidth * 2}
            result="dilated"
          />
          <feGaussianBlur
            in="dilated"
            stdDeviation={strokeWidth * 10}
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width={width} height={height} />
      <rect
        id="bgRect"
        width={width}
        height={height}
        filter="url(#blueprintPaper)"
      />
      <g id="mandala" filter="url(#mandala)" style={{ display: 'inline' }}>
        {angles.map(
          (a, i) =>
            i % 2 === 1 && (
              <use
                key={i}
                xlinkHref="#petal"
                transform={`rotate(${a}, ${cx}, ${cy})`}
                fill="url(#rearPetalGradient)"
                fillOpacity="0.85"
              />
            )
        )}
        {angles.map(
          (a, i) =>
            i % 2 === 0 && (
              <use
                key={i}
                xlinkHref="#petal"
                transform={`rotate(${a}, ${cx}, ${cy})`}
                fill="url(#frontPetalGradient)"
                fillOpacity="0.85"
              />
            )
        )}
        {[gr[2], gr[1]].map(r => (
          <Star
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            rotate={-90}
            fill={`hsl(${200}, 100%, 20%)`}
            fillOpacity={0.5}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            mask="url(#centerCircleMask)"
          />
        ))}

        {[...Array(12).keys()].map(k => (
          <g key={k}>
            <Star
              cx={cx}
              cy={cy}
              r={gr[2]}
              rotate={(360 / 12) * k}
              fill={`hsl(30, 100%, 50%)`}
              fillOpacity={1 / 12}
              mask="url(#centerCircleMask)"
            />
            <Star
              cx={cx}
              cy={cy}
              r={gr[2]}
              rotate={(360 / 12) * k}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth / 2.5}
            />
          </g>
        ))}
      </g>
      {/* <Rays /> */}
      {/* <RayLegend /> */}
      {/* <GoldenRings /> */}
      {/* <GoldenLegend /> */}
      {/* <SpherishRings /> */}
      {/* <SpherishLegend /> */}
    </svg>
  );
}

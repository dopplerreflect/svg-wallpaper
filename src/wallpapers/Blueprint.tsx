import React from 'react';
import { pc } from '../utils';
import Hexagon from './components/hexagon';
import Star from './components/star';

const PHI = (Math.sqrt(5) + 1) / 2;
const PHIm1 = PHI - 1;
const width = 1080;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const outerRadius = (height / 10) * 4;
const numRings = 5;
const gr = [...Array(numRings).keys()].map(k => outerRadius * PHIm1 ** k);
const sr = [...Array(13).keys()].map(
  k => outerRadius - (PHI ** k * height) / 1080
);
const numAngles = 60;
const angles = [...Array(numAngles).keys()].map(k => (360 / numAngles) * k);

const strokeColor = 'hsl(30, 100%, 75%)';
const strokeWidth = (height / 1080) * 1;

const p = (a: number, r: number) => ({
  x: pc(cx, cy, a, r).x,
  y: pc(cx, cy, a, r).y,
});

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
            `C${p(angles[45], sr[8]).x},${p(angles[45], sr[8]).y}`,
            ` ${p(angles[46], sr[8]).x},${p(angles[46], sr[8]).y}`,
            ` ${p(angles[46], sr[9]).x},${p(angles[46], sr[9]).y}`,
            `S${p(angles[45], sr[10]).x},${p(angles[45], sr[10]).y}`,
            ` ${p(angles[45], gr[2]).x},${p(angles[45], gr[2]).y}`,
            `M${p(angles[45], gr[0]).x},${p(angles[45], gr[0]).y}`,
            `C${p(angles[45], sr[8]).x},${p(angles[45], sr[8]).y}`,
            ` ${p(angles[44], sr[8]).x},${p(angles[44], sr[8]).y}`,
            ` ${p(angles[44], sr[9]).x},${p(angles[44], sr[9]).y}`,
            `S${p(angles[45], sr[10]).x},${p(angles[45], sr[10]).y}`,
            ` ${p(angles[45], gr[2]).x},${p(angles[45], gr[2]).y}`,
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

const Rays = () => (
  <>
    {angles.map(a => (
      <line
        key={a}
        x1={pc(cx, cy, a, gr[gr.length - 1]).x}
        y1={pc(cx, cy, a, gr[gr.length - 1]).y}
        x2={pc(cx, cy, a, gr[0]).x}
        y2={pc(cx, cy, a, gr[0]).y}
        stroke={strokeColor}
      />
    ))}
  </>
);

const RayLegend = () => (
  <>
    {angles.map((a, i) => (
      <text
        key={i}
        x={pc(cx, cy, a, gr[0] + 10).x}
        y={pc(cx, cy, a, gr[0] + 10).y}
        dominantBaseline="middle"
        textAnchor="middle"
        fill={strokeColor}
      >
        {i}
      </text>
    ))}
  </>
);
const GoldenRings = () => (
  <>
    {gr.map(r => (
      <circle key={r} cx={cx} cy={cy} r={r} stroke={strokeColor} fill="none" />
    ))}
  </>
);

const GoldenLegend = () => (
  <>
    {gr.map((r, i) => (
      <g key={r} id={`spherishRing-${r}`}>
        <line
          key={r}
          x1={cx}
          y1={cy - r}
          x2={cx + gr[0] + 40}
          y2={cy - r}
          stroke={strokeColor}
        />
        <text
          x={cx + gr[0] + 50}
          y={cy - r}
          fill={strokeColor}
          dominantBaseline="middle"
        >
          {i}
        </text>
      </g>
    ))}
  </>
);

const SpherishRings = () => (
  <>
    {sr.map((r, i) => (
      <circle key={r} cx={cx} cy={cy} r={r} stroke={strokeColor} fill="none" />
    ))}
  </>
);

const SpherishLegend = () => (
  <>
    {sr.map((r, i) => (
      <g key={r} id={`spherishRing-${r}`}>
        <line
          key={r}
          x1={cx - gr[0] - 40}
          y1={cy - r}
          x2={cx}
          y2={cy - r}
          stroke={strokeColor}
        />
        <text
          x={cx - gr[0] - 60}
          y={cy - r}
          fill={strokeColor}
          dominantBaseline="middle"
        >
          {i}
        </text>
      </g>
    ))}
  </>
);

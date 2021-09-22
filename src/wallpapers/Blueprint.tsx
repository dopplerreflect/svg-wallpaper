import React from 'react';
import { pc } from '../utils';
import Star from './components/star';

const PHI = (Math.sqrt(5) + 1) / 2;
const PHIm1 = PHI - 1;
const width = 1080;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const numRings = 5;
const gr = [...Array(numRings).keys()].map(k => (height / 10) * 4 * PHIm1 ** k);
const sr = [...Array(12).keys()].map(k => gr[0] - (k + 2) ** (PHI ** PHI));
const numAngles = 60;
const angles = [...Array(numAngles).keys()].map(k => (360 / numAngles) * k);

const strokeColor = 'hsl(240, 100%, 75%)';

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
            baseFrequency={PHIm1 ** 8}
            stitchTiles="stitch"
          />
          <feSpecularLighting
            specularExponent="10"
            lightingColor={`hsl(${240}, 100%, 33%)`}
            surfaceScale={5}
          >
            <fePointLight x={cx} y={cy} z={cy} />
          </feSpecularLighting>
        </filter>
        <path
          id="petal"
          d={[
            `M${p(angles[45], gr[0]).x},${p(angles[45], gr[0]).y}`,
            `C${p(angles[45], sr[3]).x},${p(angles[45], sr[3]).y}`,
            ` ${p(angles[46], sr[3]).x},${p(angles[46], sr[3]).y}`,
            ` ${p(angles[46], sr[5]).x},${p(angles[46], sr[5]).y}`,
            `S${p(angles[45], sr[9]).x},${p(angles[45], sr[9]).y}`,
            ` ${p(angles[45], sr[11]).x},${p(angles[45], sr[11]).y}`,
            `M${p(angles[45], gr[0]).x},${p(angles[45], gr[0]).y}`,
            `C${p(angles[45], sr[3]).x},${p(angles[45], sr[3]).y}`,
            ` ${p(angles[44], sr[3]).x},${p(angles[44], sr[3]).y}`,
            ` ${p(angles[44], sr[5]).x},${p(angles[44], sr[5]).y}`,
            `S${p(angles[45], sr[9]).x},${p(angles[45], sr[9]).y}`,
            ` ${p(angles[45], sr[11]).x},${p(angles[45], sr[11]).y}`,
          ].join('')}
          stroke={strokeColor}
          // fill="none"
        />
        <mask id="centerCircleMask">
          <rect width={width} height={height} fill="white" />
          <circle cx={cx} cy={cy} r={gr[4]} fill="black" />
        </mask>
      </defs>
      <rect width={width} height={height} />
      <rect
        id="bgRect"
        width={width}
        height={height}
        filter="url(#blueprintPaper)"
      />
      {[...Array(12).keys()].map(k => (
        <Star
          key={k}
          cx={cx}
          cy={cy}
          r={gr[2]}
          rotate={(360 / 12) * k}
          fill={`hsl(${240}, 100%, 50%)`}
          fillOpacity={1 / 6}
          mask="url(#centerCircleMask)"
        />
      ))}
      {[...Array(12).keys()].map(k => (
        <Star
          key={k}
          cx={cx}
          cy={cy}
          r={gr[2]}
          rotate={(360 / 12) * k}
          fill="none"
          stroke={strokeColor}
        />
      ))}
      <Star
        cx={cx}
        cy={cy}
        r={gr[1]}
        rotate={-90}
        fill={`hsl(${240}, 100%, 00%)`}
        fillOpacity={0.25}
        stroke={strokeColor}
      />
      <Star
        cx={cx}
        cy={cy}
        r={gr[2]}
        rotate={-90}
        fill={`hsl(${240}, 100%, 0%)`}
        fillOpacity={0.25}
        stroke={strokeColor}
      />

      {angles.map(
        (a, i) =>
          i % 2 === 1 && (
            <use
              key={i}
              xlinkHref="#petal"
              transform={`rotate(${a}, ${cx}, ${cy})`}
              fill={`hsl(${60}, 100%, 25%)`}
              fillOpacity={0.25}
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
              fill={`hsl(${240}, 100%, 25%)`}
              fillOpacity={0.5}
            />
          )
      )}
      {/* <Rays />
      <RayLegend />
      <GoldenRings />
      <GoldenLegend />
      <SpherishRings />
      <SpherishLegend /> */}
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

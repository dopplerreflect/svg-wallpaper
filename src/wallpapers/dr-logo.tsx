import React from 'react';

const PHI = (Math.sqrt(5) - 1) / 2;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const r = [cy * PHI, cy * PHI ** 3, cy * PHI ** 2];
const angles = [...Array(10).keys()].map(k => (360 / 10) * k - 90);
const strokeWidth = cy * PHI ** 4.5;
const baseHue = 45;

const pc = (angle: number, radius: number) => ({
  x: cx + radius * Math.cos(angle * (Math.PI / 180)),
  y: cy + radius * Math.sin(angle * (Math.PI / 180)),
});

export default function DRLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="shiny" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="16" result="blur" in="SourceAlpha" />
          <feOffset dx="0" dy="30" result="offset" id="feOffset1532" />
          <feSpecularLighting
            lightingColor="hsl(165, 50%, 50%)"
            in="blur"
            result="result1"
            surfaceScale="25"
            specularConstant="1"
            specularExponent="20"
          >
            <fePointLight x="960" y="130" z="0" />
          </feSpecularLighting>
          <feComposite
            in="result1"
            in2="SourceAlpha"
            operator="in"
            result="composite2"
          />
          <feComposite
            in="SourceGraphic"
            result="result2"
            operator="arithmetic"
            k2="1"
            k3="1"
            in2="composite2"
          />
          <feMerge id="feMerge2462">
            <feMergeNode in="result2" />
            <feMergeNode in="offset" />
          </feMerge>
        </filter>
      </defs>
      <rect
        id="rect-bg"
        width={width}
        height={height}
        fill={`hsl(${baseHue + 180}, 100%, 10%)`}
      />
      {r.map((r, i) => (
        <circle
          id={`circle-${i}`}
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`hsl(${baseHue + 180}, 100%, 75%)`}
          strokeWidth="2"
        />
      ))}
      <path
        id="path-star"
        d={
          angles
            .map(
              (a, i) =>
                `${i === 0 ? 'M' : 'L'}${pc(a, r[i % 2]).x},${
                  pc(a, r[i % 2]).y
                }`
            )
            .join(' ') + ' Z'
        }
        fill="none"
        stroke={`hsl(${baseHue + 180}, 100%, 75%)`}
      />
      <path
        id="path-D"
        d={[
          `M${pc(angles[0], r[0]).x},${pc(angles[0], r[0]).y}`,
          `A${r[0]},${r[0]} 0 1 1 ${pc(angles[6], r[0]).x},${
            pc(angles[6], r[0]).y
          }`,
          `Z`,
        ].join(' ')}
        fill="none"
        stroke={`hsl(${baseHue + 180}, 100%, 50%)`}
        strokeWidth={strokeWidth}
        filter="url(#shiny)"
        // transform={`rotate(-18, ${cx}, ${cy})`}
      />
      <path
        id="path-R"
        d={[
          `M${pc(angles[8] + 12, r[2]).x},${pc(angles[8] + 12, r[2]).y}`,
          `A${r[2]},${r[2]} 0 1 1 ${pc(angles[4] - 12, r[2]).x},${
            pc(angles[4] - 12, r[2]).y
          }`,
          `L${pc(angles[4], r[0]).x},${pc(angles[4], r[0]).y}`,
          `L${pc(angles[5], r[1]).x},${pc(angles[5], r[1]).y}`,
          `L${pc(angles[6] - 12, r[2]).x},${pc(angles[6] - 12, r[2]).y}`,
          `A${r[2]},${r[2]} 0 0 1 ${pc(angles[6] + 12, r[2]).x},${
            pc(angles[6] + 12, r[2]).y
          }`,
          `L${pc(angles[9], r[1]).x},${pc(angles[9], r[1]).y}`,
          `Z`,
        ].join(' ')}
        fill="none"
        stroke={`hsl(${baseHue}, 100%, 50%)`}
        strokeWidth={strokeWidth}
        filter="url(#shiny)"
        // transform={`rotate(-18, ${cx}, ${cy})`}
      />
    </svg>
  );
}

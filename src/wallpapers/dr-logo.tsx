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
          <feGaussianBlur
            in="SourceAlpha"
            stdDeviation={strokeWidth * 0.25}
            result="blur"
          />
          <feOffset in="blur" dx="0" dy="30" result="offsetBlur" />

          <feSpecularLighting
            in="blur"
            surfaceScale="25"
            specularConstant="1"
            specularExponent="2"
            lightingColor={`hsl(${baseHue + 120}, 50%, 50%)`}
            result="specOut"
          >
            <fePointLight x="960" y="-3000" z="-1000" />
          </feSpecularLighting>
          <feComposite
            in="specOut"
            in2="SourceAlpha"
            operator="in"
            result="specOut"
          />
          <feComposite
            in="SourceGraphic"
            in2="specOut"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />

          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="litPaint" />
          </feMerge>
        </filter>
      </defs>
      <rect
        width={width}
        height={height}
        fill={`hsl(${baseHue + 180}, 100%, 10%)`}
      />
      {r.map(r => (
        <circle
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
        fill="transparent"
        stroke={`hsl(${baseHue + 180}, 100%, 75%)`}
      />
      <path
        d={`M${pc(angles[0], r[0]).x},${pc(angles[0], r[0]).y} A${r[0]},${
          r[0]
        } 0 1 1 ${pc(angles[6], r[0]).x},${pc(angles[6], r[0]).y} Z`}
        fill="none"
        stroke={`hsl(${baseHue + 180}, 100%, 50%)`}
        strokeWidth={strokeWidth}
        filter="url(#shiny)"
        // transform={`rotate(-18, ${cx}, ${cy})`}
      />
      <path
        d={`M${pc(angles[8] + 12, r[2]).x},${pc(angles[8] + 12, r[2]).y} A${
          r[2]
        },${r[2]} 0 1 1 ${pc(angles[4] - 12, r[2]).x},${
          pc(angles[4] - 12, r[2]).y
        } L${pc(angles[4], r[0]).x},${pc(angles[4], r[0]).y} L${
          pc(angles[5], r[1]).x
        },${pc(angles[5], r[1]).y} L${pc(angles[6] - 12, r[2]).x},${
          pc(angles[6] - 12, r[2]).y
        } A${r[2]},${r[2]} 0 0 1 ${pc(angles[6] + 12, r[2]).x},${
          pc(angles[6] + 12, r[2]).y
        } L${pc(angles[9], r[1]).x},${pc(angles[9], r[1]).y} Z`}
        fill="none"
        stroke={`hsl(${baseHue}, 100%, 50%)`}
        strokeWidth={strokeWidth}
        filter="url(#shiny)"
        // transform={`rotate(-18, ${cx}, ${cy})`}
      />
    </svg>
  );
}

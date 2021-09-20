import React from 'react';
import { pc } from '../utils';
import Star from './components/star';
const PHI = (Math.sqrt(5) + 1) / 2;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const r = height / 2;
const rayCount = 30;
const angles = [...Array(rayCount).keys()].map(k => (360 / rayCount) * k);
const pentAngles = angles.filter(a => a % 72 === 0);
const radiiCount = 7;
const radii = [...Array(radiiCount).keys()].map(k => r * (PHI - 1) ** k);

export default function PentaMandala() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="bgGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="hsl(45, 100%, 15%)" />
          <stop offset="100%" stopColor="hsl(0, 100%, 15%" />
        </linearGradient>
        <linearGradient id="petalGradient">
          <stop offset="0%" stopColor="gold" />
          <stop offset="100%" stopColor="red" />
        </linearGradient>
        <path
          id="petal"
          d={[
            `M${pc(cx, cy, angles[27], radii[1]).x},${
              pc(cx, cy, angles[27], radii[1]).y
            }`,
            `C${pc(cx, cy, angles[28], radii[0]).x},${
              pc(cx, cy, angles[28], radii[0]).y
            }`,
            `${pc(cx, cy, angles[0], radii[1]).x},${
              pc(cx, cy, angles[0], radii[1]).y
            }`,
            `${pc(cx, cy, angles[0], radii[0]).x},${
              pc(cx, cy, angles[0], radii[0]).y
            }`,
            `C${pc(cx, cy, angles[0], radii[1]).x},${
              pc(cx, cy, angles[0], radii[1]).y
            }`,
            `${pc(cx, cy, angles[2], radii[0]).x},${
              pc(cx, cy, angles[2], radii[0]).y
            }`,
            `${pc(cx, cy, angles[3], radii[1]).x},${
              pc(cx, cy, angles[3], radii[1]).y
            }`,
            `A${radii[1]},${radii[1]}, 0 0 0`,
            `${pc(cx, cy, angles[27], radii[1]).x},${
              pc(cx, cy, angles[27], radii[1]).y
            }`,
          ].join(' ')}
          fill="url('#petalGradient')"
          fillOpacity={0.75}
        />

        <linearGradient id="chevronGradient">
          <stop offset="0%" stopColor="gold" />
          <stop offset="100%" stopColor="red" />
        </linearGradient>
        <g id="chevrons">
          {[...Array(4).keys()].map(k => (
            <path
              d={[
                `M${pc(cx, cy, angles[0], radii[k + 2]).x},${
                  pc(cx, cy, angles[0], radii[k + 2]).y
                }`,
                `L${pc(cx, cy, angles[2], radii[k + 1]).x},${
                  pc(cx, cy, angles[2], radii[k + 1]).y
                }`,
                `L${pc(cx, cy, angles[2], radii[k + 2]).x},${
                  pc(cx, cy, angles[2], radii[k + 2]).y
                }`,
                `L${pc(cx, cy, angles[0], radii[k + 3]).x},${
                  pc(cx, cy, angles[0], radii[k + 3]).y
                }`,
                `L${pc(cx, cy, angles[28], radii[k + 2]).x},${
                  pc(cx, cy, angles[28], radii[k + 2]).y
                }`,
                `L${pc(cx, cy, angles[28], radii[k + 1]).x},${
                  pc(cx, cy, angles[28], radii[k + 1]).y
                }`,
                'Z',
              ].join(' ')}
              fill="url('#chevronGradient')"
              fillOpacity={0.75}
            />
          ))}
        </g>
        <g id="points">
          {[...Array(4).keys()].map(k => (
            <path
              d={[
                `M${pc(cx, cy, angles[29], radii[k + 2]).x},${
                  pc(cx, cy, angles[29], radii[k + 2]).y
                }`,
                `L${pc(cx, cy, angles[0], radii[k + 1]).x},${
                  pc(cx, cy, angles[0], radii[k + 1]).y
                }`,
                `L${pc(cx, cy, angles[1], radii[k + 2]).x},${
                  pc(cx, cy, angles[1], radii[k + 2]).y
                }`,
                `A${radii[k + 2]},${radii[k + 2]} 0 0 0`,
                `${pc(cx, cy, angles[29], radii[k + 2]).x},${
                  pc(cx, cy, angles[29], radii[k + 2]).y
                }`,
                'Z',
              ].join(' ')}
              fill="url('#petalGradient')"
              fillOpacity={0.75}
            />
          ))}
        </g>
      </defs>

      <rect width={width} height={height} fill="url(#bgGradient)" />

      <g id="rotate-90" transform={`rotate(-90, ${cx}, ${cy})`}>
        {/* {radii.map(r => (
          <g key={r}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              stroke="hsl(225, 100%, 100%)"
              fill="none"
            />
            <Star
              cx={cx}
              cy={cy}
              r={r}
              stroke="hsl(225, 100%, 100%)"
              fill="none"
              rotate={0}
            />
          </g>
        ))}

        {angles.map((a, i) => (
          <g key={a}>
            <line
              x1={cx}
              y1={cy}
              x2={pc(cx, cy, a, r).x}
              y2={pc(cx, cy, a, r).y}
              stroke="hsl(225, 100%, 100%)"
            />
            <text
              x={pc(cx, cy, a, r + 10).x}
              y={pc(cx, cy, a, r + 10).y}
              fill="white"
            >
              {i}
            </text>
          </g>
        ))} */}

        {/* {pentAngles.map(a => (
          <use
            xlinkHref="#petal"
            transform={`rotate(${a + 36}, ${cx}, ${cy})`}
            fill="none"
            stroke="hsl(35, 100%, 50%)"
            strokeWidth={3}
          />
        ))} */}

        {pentAngles.map(a => (
          <use
            xlinkHref="#petal"
            transform={`rotate(${a}, ${cx}, ${cy})`}
            stroke="hsl(35, 100%, 75%)"
            strokeWidth={3}
          />
        ))}

        {pentAngles.map(a => (
          <g key={a}>
            <use
              xlinkHref="#chevrons"
              transform={`rotate(${a - 36}, ${cx}, ${cy})`}
              stroke="hsl(35, 100%, 75%"
              strokeWidth={3}
              strokeLinejoin="bevel"
            />
            <use
              xlinkHref="#points"
              transform={`rotate(${a}, ${cx}, ${cy})`}
              stroke="hsl(35, 100%, 75%"
              strokeWidth={3}
            />
          </g>
        ))}

        <Star
          cx={cx}
          cy={cy}
          r={radii[5]}
          rotate={0}
          stroke="hsl(35, 100%, 75%"
          strokeWidth={3}
          fill="url(#petalGradient)"
          fillOpacity={0.75}
        />

        {angles.map(
          a =>
            a % 72 !== 0 && (
              <Star
                cx={pc(cx, cy, a, radii[0] - radii[6]).x}
                cy={pc(cx, cy, a, radii[0] - radii[6]).y}
                r={radii[6]}
                rotate={a}
                stroke="hsl(35, 100%, 75%)"
                fill="url(#petalGradient)"
                fillOpacity={0.75}
                strokeWidth={3}
              />
            )
        )}
      </g>
    </svg>
  );
}

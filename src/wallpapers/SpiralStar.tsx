import React from 'react';
const PHI = (1 + Math.sqrt(5)) / 2;
const negPHI = PHI - 1;
const width = 1920;
const height = 1080;
const cx = width / 2;
const cy = height / 2;
const radii = Array.from(Array(12)).map((_, i) => cy * negPHI ** i);
const angles = Array.from(Array(10)).map((_, i) => i * (360 / 10));
const circleDivisions = 89;
const radials = 34;
const pc = (angle: number, radius: number) => {
  return {
    x: cx + radius * Math.cos(angle * (Math.PI / 180)),
    y: cy + radius * Math.sin(angle * (Math.PI / 180)),
  };
};

export default function SpiralStar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="5%" stopColor="hsl(0, 100%, 2%)" />
          <stop offset="95%" stopColor="hsl(30, 100%, 10%)" />
        </linearGradient>
        <clipPath id="circleClip">
          <circle cx={cx} cy={cy} r={cy - 1} />
        </clipPath>
      </defs>
      <rect width={width} height={height} fill="url(#gradient)" />
      <g id="sunflower-bg">
        {[...Array(circleDivisions).keys()].map(o => {
          let angle = (360 / circleDivisions) * o + 1;
          let radian = (angle * Math.PI) / 180;
          return (
            <g key={o}>
              {[...Array(radials).keys()].map(i => {
                return (
                  <circle
                    key={i}
                    cx={Math.round(
                      cx +
                        angle *
                          PHI *
                          2 *
                          Math.cos(radian + ((Math.PI * 2) / radials) * i)
                    )}
                    cy={Math.round(
                      cy +
                        angle *
                          PHI *
                          2 *
                          Math.sin(radian + ((Math.PI * 2) / radials) * i)
                    )}
                    r={o / Math.PI}
                    style={{
                      stroke: `hsla(${Math.round(
                        280 - (30 / radials) * o
                      )}, 100%, 33%, 0.9)`,
                      fill: `hsla(${Math.round(
                        280 - (30 / radials) * o
                      )}, 100%, 10%, 0.3)`,
                    }}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
      <g transform={`rotate(-90, ${cx}, ${cy})`}>
        {radii.map(r => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            stroke={`hsla(45, 100%, 50%, 1)`}
            fill="transparent"
          />
        ))}
      </g>
      <g transform={`rotate(-90, ${cx}, ${cy})`}>
        <path
          d={`M${pc(angles[0], radii[0]).x},${pc(angles[0], radii[0]).y} ${[
            ...Array(angles.length - 1).keys(),
          ]
            .map(
              i =>
                `L${pc(angles[i + 1], i % 2 === 0 ? radii[2] : radii[0]).x},${
                  pc(angles[i + 1], i % 2 === 0 ? radii[2] : radii[0]).y
                }`
            )
            .join(' ')} Z`}
          stroke="hsl(45, 100%, 50%)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="bevel"
          transform={`rotate(0, ${cx}, ${cy})`}
          fill="hsla(240, 100%, 20%, 0.5)"
        />
      </g>
      <g id="sunflower" clipPath="url(#circleClip)">
        {[...Array(circleDivisions).keys()].map(o => {
          let angle = (360 / circleDivisions) * o + 1;
          let radian = (angle * Math.PI) / 180;
          return (
            <g key={o}>
              {Array.from({ length: radials }).map((_, i) => {
                return (
                  <circle
                    key={i}
                    cx={Math.round(
                      cx +
                        angle *
                          PHI *
                          Math.cos(radian + ((Math.PI * 2) / radials) * i)
                    )}
                    cy={Math.round(
                      cy +
                        angle *
                          PHI *
                          Math.sin(radian + ((Math.PI * 2) / radials) * i)
                    )}
                    r={o / Math.PI / 3}
                    style={{
                      stroke: `hsla(${Math.round(
                        90 - (30 / radials) * o
                      )}, 100%, 50%, 1)`,
                      fill: `hsla(${Math.round(
                        90 - (30 / radials) * o
                      )}, 100%, 10%, 1)`,
                    }}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

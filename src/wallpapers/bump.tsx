import React from 'react';
import Star from './components/star';

const clip = false;
const width = 1920;
const height = 1080;

export default function Bump() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={clip ? width : undefined}
      height={clip ? height : undefined}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <radialGradient id="r-gradient" r={0.5}>
          <stop offset="0%" stopColor="hsla(345, 100%, 50%, 0.5)" />
          <stop offset="100%" stopColor="hsla(45, 100%, 50%, 0)" />
        </radialGradient>
        <filter id="bumpy">
          <feTurbulence baseFrequency="0.025 0.0005" result="turbulence" />
          <feDiffuseLighting
            lightingColor="hsla(225, 100%, 20%)"
            surfaceScale="50"
            result="lighting"
          >
            <feDistantLight azimuth={-90} elevation={20} />
          </feDiffuseLighting>
          <feBlend in="turbulence" in2="lighting" mode="multiply" />
        </filter>
        <filter id="shiny" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur" />
          <feOffset in="blur" dx="0" dy="30" result="offsetBlur" />

          <feSpecularLighting
            in="blur"
            surfaceScale="10"
            specularConstant=".5"
            specularExponent="10"
            lightingColor="hsl(45, 100%, 85%)"
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
      <rect width={width} height={height} filter="url(#bumpy)" />
      <circle
        cx={width / 2}
        cy={height / 2}
        r={(height / 2) * 0.61803}
        fill={`url(#r-gradient)`}
        stroke={`hsl(0, 100%, 5%)`}
        strokeWidth={30}
        filter="url(#shiny)"
      />
      <Star
        upright
        cx={width / 2}
        cy={height / 2}
        r={(height / 2) * 0.61803}
        stroke={`hsl(45, 100%, 33%)`}
        strokeWidth={30}
        fill={`none`}
        filter="url(#shiny)"
      />
    </svg>
  );
}

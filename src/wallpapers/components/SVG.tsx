import React, { ReactChildren, ReactNode } from 'react';

interface SVGProps {
  children: ReactNode;
  width: number;
  height: number;
}

export default function SVG({ width, height, children }: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
    >
      {children}
    </svg>
  );
}

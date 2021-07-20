import React from 'react';

const clip = false;
const width = 1920;
const height = 1080;
// const randomPoints = [...Array(144)].map(i => ({
//   cx: Math.round(Math.random() * width),
//   cy: Math.round(Math.random() * height),
//   r: Math.round(Math.random() * 36),
// }));
const randomPoints = [
  { cx: 1008, cy: 182, r: 17 },
  { cx: 647, cy: 997, r: 7 },
  { cx: 1748, cy: 437, r: 10 },
  { cx: 1208, cy: 576, r: 4 },
  { cx: 1286, cy: 232, r: 16 },
  { cx: 1170, cy: 985, r: 17 },
  { cx: 1413, cy: 712, r: 28 },
  { cx: 854, cy: 39, r: 25 },
  { cx: 1003, cy: 916, r: 8 },
  { cx: 1524, cy: 427, r: 1 },
  { cx: 1085, cy: 369, r: 1 },
  { cx: 1691, cy: 1021, r: 29 },
  { cx: 1042, cy: 341, r: 2 },
  { cx: 777, cy: 856, r: 14 },
  { cx: 120, cy: 459, r: 33 },
  { cx: 823, cy: 391, r: 19 },
  { cx: 1692, cy: 967, r: 29 },
  { cx: 1838, cy: 872, r: 13 },
  { cx: 1678, cy: 506, r: 27 },
  { cx: 1599, cy: 817, r: 23 },
  { cx: 834, cy: 1057, r: 21 },
  { cx: 528, cy: 310, r: 31 },
  { cx: 1570, cy: 476, r: 13 },
  { cx: 703, cy: 689, r: 11 },
  { cx: 348, cy: 457, r: 4 },
  { cx: 657, cy: 516, r: 6 },
  { cx: 1120, cy: 5, r: 11 },
  { cx: 1582, cy: 997, r: 26 },
  { cx: 1028, cy: 209, r: 6 },
  { cx: 1768, cy: 86, r: 18 },
  { cx: 279, cy: 1039, r: 25 },
  { cx: 817, cy: 380, r: 14 },
  { cx: 1370, cy: 480, r: 9 },
  { cx: 1225, cy: 481, r: 24 },
  { cx: 1149, cy: 857, r: 13 },
  { cx: 1786, cy: 155, r: 32 },
  { cx: 203, cy: 309, r: 25 },
  { cx: 979, cy: 612, r: 12 },
  { cx: 1293, cy: 935, r: 3 },
  { cx: 728, cy: 957, r: 27 },
  { cx: 400, cy: 357, r: 15 },
  { cx: 1795, cy: 413, r: 8 },
  { cx: 1323, cy: 981, r: 5 },
  { cx: 1713, cy: 436, r: 17 },
  { cx: 859, cy: 425, r: 12 },
  { cx: 1424, cy: 46, r: 3 },
  { cx: 624, cy: 726, r: 2 },
  { cx: 1127, cy: 111, r: 33 },
  { cx: 1581, cy: 867, r: 25 },
  { cx: 1403, cy: 221, r: 1 },
  { cx: 869, cy: 435, r: 22 },
  { cx: 454, cy: 848, r: 25 },
  { cx: 1575, cy: 1027, r: 11 },
  { cx: 650, cy: 58, r: 1 },
  { cx: 420, cy: 354, r: 2 },
  { cx: 1154, cy: 110, r: 17 },
  { cx: 1440, cy: 324, r: 16 },
  { cx: 979, cy: 536, r: 32 },
  { cx: 655, cy: 825, r: 21 },
  { cx: 387, cy: 481, r: 23 },
  { cx: 190, cy: 744, r: 31 },
  { cx: 1541, cy: 74, r: 15 },
  { cx: 1000, cy: 925, r: 15 },
  { cx: 20, cy: 680, r: 19 },
  { cx: 1126, cy: 674, r: 27 },
  { cx: 156, cy: 163, r: 6 },
  { cx: 1320, cy: 559, r: 27 },
  { cx: 1263, cy: 606, r: 23 },
  { cx: 1160, cy: 605, r: 17 },
  { cx: 209, cy: 820, r: 33 },
  { cx: 481, cy: 161, r: 26 },
  { cx: 1409, cy: 850, r: 21 },
  { cx: 109, cy: 819, r: 21 },
  { cx: 1026, cy: 183, r: 10 },
  { cx: 691, cy: 64, r: 31 },
  { cx: 561, cy: 888, r: 20 },
  { cx: 1204, cy: 936, r: 23 },
  { cx: 1297, cy: 940, r: 4 },
  { cx: 444, cy: 986, r: 33 },
  { cx: 1876, cy: 1014, r: 10 },
  { cx: 209, cy: 425, r: 23 },
  { cx: 866, cy: 387, r: 3 },
  { cx: 1172, cy: 88, r: 36 },
  { cx: 1052, cy: 725, r: 16 },
  { cx: 1227, cy: 773, r: 13 },
  { cx: 1162, cy: 884, r: 23 },
  { cx: 1094, cy: 773, r: 33 },
  { cx: 188, cy: 994, r: 18 },
  { cx: 148, cy: 811, r: 15 },
  { cx: 780, cy: 797, r: 15 },
  { cx: 1220, cy: 449, r: 29 },
  { cx: 754, cy: 591, r: 19 },
  { cx: 520, cy: 427, r: 27 },
  { cx: 1179, cy: 823, r: 10 },
  { cx: 938, cy: 530, r: 25 },
  { cx: 1772, cy: 751, r: 12 },
  { cx: 1762, cy: 584, r: 17 },
  { cx: 1129, cy: 123, r: 5 },
  { cx: 353, cy: 355, r: 12 },
  { cx: 1624, cy: 90, r: 21 },
  { cx: 273, cy: 783, r: 25 },
  { cx: 416, cy: 653, r: 29 },
  { cx: 1223, cy: 494, r: 35 },
  { cx: 1272, cy: 782, r: 11 },
  { cx: 851, cy: 532, r: 19 },
  { cx: 1660, cy: 992, r: 11 },
  { cx: 1032, cy: 32, r: 4 },
  { cx: 850, cy: 230, r: 19 },
  { cx: 376, cy: 516, r: 9 },
  { cx: 641, cy: 921, r: 22 },
  { cx: 1691, cy: 684, r: 18 },
  { cx: 363, cy: 919, r: 33 },
  { cx: 1595, cy: 161, r: 27 },
  { cx: 277, cy: 600, r: 13 },
  { cx: 1023, cy: 678, r: 17 },
  { cx: 549, cy: 140, r: 24 },
  { cx: 865, cy: 538, r: 15 },
  { cx: 1226, cy: 628, r: 35 },
  { cx: 429, cy: 71, r: 6 },
  { cx: 159, cy: 270, r: 34 },
  { cx: 196, cy: 182, r: 16 },
  { cx: 212, cy: 443, r: 15 },
  { cx: 1597, cy: 315, r: 25 },
  { cx: 842, cy: 1016, r: 35 },
  { cx: 1217, cy: 373, r: 26 },
  { cx: 1550, cy: 267, r: 8 },
  { cx: 661, cy: 241, r: 31 },
  { cx: 1648, cy: 17, r: 33 },
  { cx: 232, cy: 248, r: 0 },
  { cx: 843, cy: 518, r: 4 },
  { cx: 1497, cy: 303, r: 32 },
  { cx: 3, cy: 862, r: 24 },
  { cx: 1696, cy: 616, r: 7 },
  { cx: 451, cy: 745, r: 16 },
  { cx: 133, cy: 886, r: 8 },
  { cx: 1901, cy: 655, r: 22 },
  { cx: 725, cy: 416, r: 27 },
  { cx: 831, cy: 437, r: 23 },
  { cx: 1307, cy: 148, r: 7 },
  { cx: 1554, cy: 431, r: 9 },
  { cx: 917, cy: 1013, r: 19 },
  { cx: 1227, cy: 571, r: 17 },
  { cx: 1469, cy: 521, r: 35 },
  { cx: 1841, cy: 728, r: 36 },
];

export default function RandomCircles() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={clip ? width : undefined}
      height={clip ? height : undefined}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id="bg-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="hsl(220, 100%, 30%)" />
          <stop offset="50%" stopColor="hsl(240, 100%, 20%)" />

          <stop offset="90%" stopColor="hsl(260, 100%, 10%)" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#bg-gradient)" />
      {randomPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill="none"
          stroke={`hsla(${180 + p.cy / 10.8}, 100%, 50%, 0.75)`}
          strokeWidth={2}
        />
      ))}
    </svg>
  );
}
console.log(JSON.stringify(randomPoints));

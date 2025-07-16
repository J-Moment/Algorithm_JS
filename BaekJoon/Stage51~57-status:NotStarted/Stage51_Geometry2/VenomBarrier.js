const fs = require("fs");
const data = fs
  .readFileSync("/dev/stdin", "utf8")
  .trim()
  .split(/\s+/)
  .map(Number);
let ptr = 0;

const N = data[ptr++];
const L = data[ptr++];
const pts = [];
for (let i = 0; i < N; i++) {
  const x = data[ptr++];
  const y = data[ptr++];
  pts.push({ x, y });
}

pts.sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));

function cross(A, B, C) {
  return (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
}

const lower = [];
for (const p of pts) {
  while (
    lower.length >= 2 &&
    cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
  ) {
    lower.pop();
  }
  lower.push(p);
}

const upper = [];
for (let i = N - 1; i >= 0; i--) {
  const p = pts[i];
  while (
    upper.length >= 2 &&
    cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
  ) {
    upper.pop();
  }
  upper.push(p);
}

lower.pop();
upper.pop();
const hull = lower.concat(upper);

let peri = 0;
for (let i = 0, m = hull.length; i < m; i++) {
  const j = (i + 1) % m;
  const dx = hull[i].x - hull[j].x;
  const dy = hull[i].y - hull[j].y;
  peri += Math.hypot(dx, dy);
}

const ans = peri + 2 * Math.PI * L;

console.log(Math.round(ans));
const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin", "utf8")
  .trim()
  .split(/\s+/)
  .map(Number);

let ptr = 0;
const N = input[ptr++];
const pts = new Array(N);
for (let i = 0; i < N; i++) {
  const x = input[ptr++];
  const y = input[ptr++];
  pts[i] = { x, y };
}

pts.sort((a, b) => (a.x !== b.x ? a.x - b.x : a.y - b.y));

function cross(o, a, b) {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
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

const hullSize = lower.length + upper.length - 2;

console.log(hullSize);
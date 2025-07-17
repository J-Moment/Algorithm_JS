const fs = require("fs");
const data = fs
  .readFileSync("/dev/stdin", "utf8")
  .trim()
  .split(/\s+/)
  .map(Number);
let ptr = 0;

function ccw(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function rotate(poly, k) {
  return poly.slice(k).concat(poly.slice(0, k));
}

function normalize(poly) {
  let k = 0;
  for (let i = 1; i < poly.length; i++) {
    if (
      poly[i].y < poly[k].y ||
      (poly[i].y === poly[k].y && poly[i].x < poly[k].x)
    ) {
      k = i;
    }
  }
  return rotate(poly, k);
}

function isInsideConvex(poly, pt) {
  const n = poly.length;
  if (n < 3) return false;
  if (ccw(poly[0], poly[1], pt) <= 0) return false;
  if (ccw(poly[0], poly[n - 1], pt) >= 0) return false;
  let lo = 1,
    hi = n - 1;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >>> 1;
    if (ccw(poly[0], poly[mid], pt) > 0) lo = mid;
    else hi = mid;
  }
  return ccw(poly[lo], poly[hi], pt) > 0;
}

const N = data[ptr++],
  M = data[ptr++],
  K = data[ptr++];
const A = new Array(N);
for (let i = 0; i < N; i++) {
  A[i] = { x: data[ptr++], y: data[ptr++] };
}
const B = new Array(M);
for (let i = 0; i < M; i++) {
  B[i] = { x: data[ptr++], y: data[ptr++] };
}

const A_norm = normalize(A);
const B_norm = normalize(B);

let bad = 0;
for (let i = 0; i < K; i++) {
  const p = { x: data[ptr++], y: data[ptr++] };
  if (!isInsideConvex(A_norm, p) || isInsideConvex(B_norm, p)) {
    bad++;
  }
}

process.stdout.write(bad === 0 ? "YES" : String(bad));
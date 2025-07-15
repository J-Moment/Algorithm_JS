const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const data = fs.readFileSync(filepath, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

function cross(a, b, c) {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function dist2(a, b) {
  const dx = a.x - b.x,
    dy = a.y - b.y;
  return dx * dx + dy * dy;
}

const T = data[ptr++];
const out = [];

for (let tc = 0; tc < T; tc++) {
  const n = data[ptr++];
  const pts = [];
  for (let i = 0; i < n; i++) {
    pts.push({ x: data[ptr++], y: data[ptr++] });
  }
  if (n === 2) {
    out.push(`${pts[0].x} ${pts[0].y} ${pts[1].x} ${pts[1].y}`);
    continue;
  }

  pts.sort((A, B) => (A.x !== B.x ? A.x - B.x : A.y - B.y));

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
  for (let i = n - 1; i >= 0; i--) {
    const p = pts[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }

  upper.pop();
  lower.pop();
  const hull = lower.concat(upper);
  const m = hull.length;

  let j = 1;
  let best = 0;
  let pa = hull[0],
    pb = hull[1];
  for (let i = 0; i < m; i++) {
    const ni = (i + 1) % m;
    while (true) {
      const nj = (j + 1) % m;
      const cur = Math.abs(cross(hull[i], hull[ni], hull[j]));
      const next = Math.abs(cross(hull[i], hull[ni], hull[nj]));
      if (next > cur) j = nj;
      else break;
    }
    const d2 = dist2(hull[i], hull[j]);
    if (d2 > best) {
      best = d2;
      pa = hull[i];
      pb = hull[j];
    }
    const d2n = dist2(hull[ni], hull[j]);
    if (d2n > best) {
      best = d2n;
      pa = hull[ni];
      pb = hull[j];
    }
  }
  out.push(`${pa.x} ${pa.y} ${pb.x} ${pb.y}`);
}

console.log(out.join("\n"));
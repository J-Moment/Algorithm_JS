const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const N = data[ptr++];

const segs = Array(N);
for (let i = 0; i < N; i++) {
  const x1 = data[ptr++];
  const y1 = data[ptr++];
  const x2 = data[ptr++];
  const y2 = data[ptr++];
  segs[i] = { x1, y1, x2, y2 };
}

const parent = new Int32Array(N);
const size = new Int32Array(N);
for (let i = 0; i < N; i++) {
  parent[i] = i;
  size[i] = 1;
}
function find(x) {
  while (parent[x] !== x) {
    parent[x] = parent[parent[x]];
    x = parent[x];
  }
  return x;
}
function unite(a, b) {
  let ra = find(a),
    rb = find(b);
  if (ra === rb) return;
  if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
  parent[rb] = ra;
  size[ra] += size[rb];
}

function ccw(x1, y1, x2, y2, x3, y3) {
  return (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
}

function overlap(a1, a2, b1, b2) {
  if (a1 > a2) [a1, a2] = [a2, a1];
  if (b1 > b2) [b1, b2] = [b2, b1];
  return b1 <= a2 && a1 <= b2;
}

function intersect(s1, s2) {
  const { x1: x1, y1: y1, x2: x2, y2: y2 } = s1;
  const { x1: x3, y1: y3, x2: x4, y2: y4 } = s2;
  const d1 = ccw(x1, y1, x2, y2, x3, y3);
  const d2 = ccw(x1, y1, x2, y2, x4, y4);
  const d3 = ccw(x3, y3, x4, y4, x1, y1);
  const d4 = ccw(x3, y3, x4, y4, x2, y2);
  if (d1 === 0 && d2 === 0 && d3 === 0 && d4 === 0) {
    return overlap(x1, x2, x3, x4) && overlap(y1, y2, y3, y4);
  }
  return d1 * d2 <= 0 && d3 * d4 <= 0;
}

for (let i = 0; i < N; i++) {
  const si = segs[i];
  for (let j = i + 1; j < N; j++) {
    if (intersect(si, segs[j])) unite(i, j);
  }
}

const compSize = new Map();
for (let i = 0; i < N; i++) {
  const r = find(i);
  compSize.set(r, (compSize.get(r) || 0) + 1);
}
const groups = compSize.size;
let maxSize = 0;
for (const v of compSize.values()) {
  if (v > maxSize) maxSize = v;
}

process.stdout.write(groups + "\n" + maxSize + "\n");
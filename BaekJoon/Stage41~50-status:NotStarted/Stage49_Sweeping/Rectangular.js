const fs = require("fs");
const data = fs
  .readFileSync("/dev/stdin", "utf8")
  .trim()
  .split(/\s+/)
  .map(Number);
let ptr = 0;

const N = data[ptr++];
const events = [];
const ys = [];
for (let i = 0; i < N; i++) {
  const x1 = data[ptr++],
    x2 = data[ptr++];
  const y1 = data[ptr++],
    y2 = data[ptr++];
  events.push({ x: x1, y1, y2, type: 1 });
  events.push({ x: x2, y1, y2, type: -1 });
  ys.push(y1, y2);
}

ys.sort((a, b) => a - b);
const uniqY = [ys[0]];
for (let i = 1; i < ys.length; i++) {
  if (ys[i] !== ys[i - 1]) uniqY.push(ys[i]);
}
const M = uniqY.length;

function yIdx(y) {
  let l = 0,
    r = M - 1;
  while (l <= r) {
    const m = (l + r) >>> 1;
    if (uniqY[m] === y) return m;
    else if (uniqY[m] < y) l = m + 1;
    else r = m - 1;
  }
  return -1;
}

events.sort((a, b) => a.x - b.x);

const size = 4 * M;
const segLen = new Array(size).fill(0);
const segCnt = new Int32Array(size);

function pull(node, l, r) {
  if (segCnt[node] > 0) {
    segLen[node] = uniqY[r + 1] - uniqY[l];
  } else if (l === r) {
    segLen[node] = 0;
  } else {
    segLen[node] = segLen[node << 1] + segLen[(node << 1) | 1];
  }
}

function update(node, l, r, ql, qr, val) {
  if (qr < l || r < ql) return;
  if (ql <= l && r <= qr) {
    segCnt[node] += val;
    pull(node, l, r);
    return;
  }
  const mid = (l + r) >>> 1;
  update(node << 1, l, mid, ql, qr, val);
  update((node << 1) | 1, mid + 1, r, ql, qr, val);
  pull(node, l, r);
}

let area = 0;
let lastX = events[0].x;

for (const ev of events) {
  const dx = ev.x - lastX;
  if (dx > 0) {
    area += segLen[1] * dx;
    lastX = ev.x;
  }
  const yi1 = yIdx(ev.y1);
  const yi2 = yIdx(ev.y2);
  if (yi1 < yi2) {
    update(1, 0, M - 2, yi1, yi2 - 1, ev.type);
  }
}

console.log(area);
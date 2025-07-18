const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "./input.txt",
    "utf8"
  )
  .trim()
  .split(/\s+/)
  .map(Number);
let ptr = 0;

const T = input[ptr++];
const out = [];

for (let tc = 0; tc < T; tc++) {
  const n = input[ptr++];
  const pts = new Array(n);

  for (let i = 0; i < n; i++) {
    const x = input[ptr++];
    const y = input[ptr++];
    pts[i] = { x, y, idx: i };
  }

  let p0 = pts[0];
  for (let i = 1; i < n; i++) {
    const p = pts[i];
    if (p.y < p0.y || (p.y === p0.y && p.x < p0.x)) {
      p0 = p;
    }
  }

  const dx0 = 0,
    dy0 = 0;
  pts.sort((a, b) => {
    if (a === p0) return -1;
    if (b === p0) return 1;
    const ax = a.x - p0.x,
      ay = a.y - p0.y;
    const bx = b.x - p0.x,
      by = b.y - p0.y;
    const cross = ax * by - ay * bx;
    if (cross !== 0) return cross > 0 ? -1 : 1;
    const da = ax * ax + ay * ay;
    const db = bx * bx + by * by;
    return da - db;
  });
  let cnt = 0;
  for (let j = n - 1; j > 0; j--) {
    const a = pts[j],
      b = pts[j - 1];
    const ax = a.x - p0.x,
      ay = a.y - p0.y;
    const bx = b.x - p0.x,
      by = b.y - p0.y;
    if (ax * by - ay * bx === 0) cnt++;
    else break;
  }
  if (cnt > 0) {
    const start = n - cnt - 1;
    pts.splice(
      start,
      cnt + 1,
      ...pts.slice(start, n).sort((a, b) => {
        const dax = a.x - p0.x,
          day = a.y - p0.y;
        const dbx = b.x - p0.x,
          dby = b.y - p0.y;
        const da = dax * dax + day * day;
        const db = dbx * dbx + dby * dby;
        return db - da;
      })
    );
  }
  const res = pts.map((p) => p.idx);
  out.push(res.join(" "));
}

process.stdout.write(out.join("\n"));
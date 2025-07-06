const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "./input.txt",
    "utf8"
  )
  .trim()
  .split(/\s+/)
  .map(Number);

let idx = 0;
const N = input[idx++];
const segs = new Array(N);

for (let i = 0; i < N; i++) {
  const x = input[idx++],
    y = input[idx++];
  segs[i] = [x, y];
}

segs.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

let total = 0;
let [curL, curR] = segs[0];

for (let i = 1; i < N; i++) {
  const [l, r] = segs[i];
  if (l > curR) {
    total += curR - curL;
    curL = l;
    curR = r;
  } else if (r > curR) {
    curR = r;
  }
}

total += curR - curL;

console.log(total);
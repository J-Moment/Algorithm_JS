const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt","utf8").trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const M = input[idx++];

const intervals = [];
for (let i = 0; i < N; i++) {
  const s = input[idx++];
  const e = input[idx++];
  if (s > e) {
    intervals.push([e, s]);
  }
}

if (intervals.length === 0) {
  console.log(M);
  process.exit(0);
}

intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

let totalBack = 0;
let [curL, curR] = intervals[0];
for (let i = 1; i < intervals.length; i++) {
  const [L, R] = intervals[i];
  if (L > curR) {
    totalBack += curR - curL;
    curL = L;
    curR = R;
  } else {
    curR = Math.max(curR, R);
  }
}
totalBack += curR - curL;

console.log(M + 2 * totalBack);
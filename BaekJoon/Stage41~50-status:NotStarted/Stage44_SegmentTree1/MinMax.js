const fs = require("fs");

const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const N = data[ptr++];
const Q = data[ptr++];
const arr = data.slice(ptr, ptr + N);
ptr += N;

const log2 = new Array(N + 1);
log2[1] = 0;
for (let i = 2; i <= N; i++) {
  log2[i] = log2[i >> 1] + 1;
}

const K = log2[N] + 1;

const stMin = Array.from({ length: K }, () => new Array(N));
const stMax = Array.from({ length: K }, () => new Array(N));

for (let i = 0; i < N; i++) {
  stMin[0][i] = arr[i];
  stMax[0][i] = arr[i];
}

for (let k = 1; k < K; k++) {
  const len = 1 << (k - 1);
  for (let i = 0; i + (1 << k) <= N; i++) {
    const leftMin = stMin[k - 1][i];
    const rightMin = stMin[k - 1][i + len];
    stMin[k][i] = leftMin < rightMin ? leftMin : rightMin;

    const leftMax = stMax[k - 1][i];
    const rightMax = stMax[k - 1][i + len];
    stMax[k][i] = leftMax > rightMax ? leftMax : rightMax;
  }
}

let out = [];
for (let qi = 0; qi < Q; qi++) {
  let L = data[ptr++] - 1;
  let R = data[ptr++] - 1;
  if (L > R) [L, R] = [R, L];

  const len = R - L + 1;
  const k = log2[len];
  const span = 1 << k;

  const min1 = stMin[k][L];
  const min2 = stMin[k][R - span + 1];
  const ansMin = min1 < min2 ? min1 : min2;

  const max1 = stMax[k][L];
  const max2 = stMax[k][R - span + 1];
  const ansMax = max1 > max2 ? max1 : max2;

  out.push(ansMin + " " + ansMax);
}

process.stdout.write(out.join("\n"));
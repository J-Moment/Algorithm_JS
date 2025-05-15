const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const data = fs.readFileSync(filepath, "utf8").trim().split(/\s+/).map(Number);

const N = data[0];
const cost = [];
let idx = 1;
for (let i = 0; i < N; i++) {
  cost.push(data.slice(idx, idx + N));
  idx += N;
}

const SIZE = 1 << N;

const dp = new Float64Array(SIZE);
dp.fill(Infinity);
dp[0] = 0;

const bitCount = new Uint8Array(SIZE);
for (let mask = 1; mask < SIZE; mask++) {
  bitCount[mask] = bitCount[mask >> 1] + (mask & 1);
}

for (let mask = 0; mask < SIZE; mask++) {
  const i = bitCount[mask];
  if (i >= N) continue;
  const base = dp[mask];
  for (let j = 0; j < N; j++) {
    if (!(mask & (1 << j))) {
      const next = mask | (1 << j);
      const val = base + cost[i][j];
      if (val < dp[next]) {
        dp[next] = val;
      }
    }
  }
}

console.log(dp[SIZE - 1]);
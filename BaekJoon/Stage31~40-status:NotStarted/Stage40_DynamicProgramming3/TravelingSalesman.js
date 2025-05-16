const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const data = fs.readFileSync(filepath, "utf8").trim().split(/\s+/).map(Number);

const N = data[0];
const dist = Array.from({ length: N }, () => Array(N));
let idx = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    dist[i][j] = data[idx++];
  }
}

const FULL = 1 << N;
const dp = Array.from({ length: FULL }, () => Array(N).fill(Infinity));

dp[1][0] = 0;

for (let mask = 1; mask < FULL; mask++) {
  for (let u = 0; u < N; u++) {
    if (!(mask & (1 << u)) || dp[mask][u] === Infinity) continue;
    for (let v = 0; v < N; v++) {
      if (mask & (1 << v)) continue;
      if (dist[u][v] === 0) continue;
      const nextMask = mask | (1 << v);
      const cost = dp[mask][u] + dist[u][v];
      if (cost < dp[nextMask][v]) {
        dp[nextMask][v] = cost;
      }
    }
  }
}

const END = FULL - 1;
let answer = Infinity;
for (let u = 1; u < N; u++) {
  if (dist[u][0] === 0) continue;
  const cost = dp[END][u] + dist[u][0];
  if (cost < answer) answer = cost;
}

console.log(answer);
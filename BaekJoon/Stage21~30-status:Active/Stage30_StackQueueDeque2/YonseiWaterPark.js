const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let p = 0;
const N = data[p++];
const D = data[p++];

const dp = new Int32Array(N);
const dqv = new Int32Array(N);
const dqi = new Int32Array(N);
let head = 0,
  tail = 0;
let ans = -Infinity;

for (let i = 0; i < N; i++) {
  while (head < tail && dqi[head] < i - D) head++;

  const bestPrev = head < tail ? dqv[head] : 0;

  const ki = data[p++];
  const cur = bestPrev > 0 ? bestPrev + ki : ki;

  dp[i] = cur;
  if (cur > ans) ans = cur;

  while (head < tail && dqv[tail - 1] <= cur) tail--;
  dqv[tail] = cur;
  dqi[tail] = i;
  tail++;
}

head = tail = 0;
for (let t = 0; t < N; t++) {
  const i = N - 1 - t;
  while (head < tail && dqi[head] > i + D) head++;

  const bestPrev = head < tail ? dqv[head] : 0;
  const cur =
    bestPrev > 0
      ? bestPrev + dp[i] - (bestPrev > 0 ? dp[i] - data[p - N + i] : dp[i])
      : dp[i];

  const dpi = bestPrev > 0 ? bestPrev + data[p - N + i] : data[p - N + i];
  if (dpi > ans) ans = dpi;

  while (head < tail && dqv[tail - 1] <= dpi) tail--;
  dqv[tail] = dpi;
  dqi[tail++] = i;
}

process.stdout.write(ans.toString());
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const lines = fs.readFileSync(filepath, "utf8").trim().split("\n");

const N = +lines[0];
const arr = lines.slice(1, 1 + N).map(s => s.trim());
const K = +lines[1 + N];

const mod = Array(N);
const len = Array(N);
const pow10 = [1 % K];
for (let i = 1; i <= 50; i++) {
  pow10[i] = (pow10[i - 1] * 10) % K;
}
for (let i = 0; i < N; i++) {
  len[i] = arr[i].length;
  let m = 0;
  for (const ch of arr[i]) {
    m = (m * 10 + (ch.charCodeAt(0) - 48)) % K;
  }
  mod[i] = m;
}

const FULL = 1 << N;
const dp = Array.from({ length: FULL }, () => Array(K).fill(0));
dp[0][0] = 1;

for (let mask = 0; mask < FULL; mask++) {
  for (let r = 0; r < K; r++) {
    const cnt = dp[mask][r];
    if (cnt === 0) continue;
    for (let j = 0; j < N; j++) {
      if (!(mask & (1 << j))) {
        const nextMask = mask | (1 << j);
        const nr = (r * pow10[len[j]] + mod[j]) % K;
        dp[nextMask][nr] += cnt;
      }
    }
  }
}

let p = dp[FULL - 1][0];
let q = 1;
for (let i = 2; i <= N; i++) q *= i;

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}
const g = gcd(p, q);
p /= g;
q /= g;

console.log(`${p}/${q}`);
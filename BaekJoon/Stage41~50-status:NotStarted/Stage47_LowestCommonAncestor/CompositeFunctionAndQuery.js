const fs = require("fs");
const data = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt","utf8").trim().split(/\s+/).map(Number);

let idx = 0;
const m = data[idx++];

const f = new Array(m + 1);
for (let i = 1; i <= m; i++) {
  f[i] = data[idx++];
}

const Q = data[idx++];
const queries = new Array(Q);
let maxN = 0;

for (let i = 0; i < Q; i++) {
  const n = data[idx++],
    x = data[idx++];
  queries[i] = [n, x];
  if (n > maxN) maxN = n;
}

const LG = Math.floor(Math.log2(maxN)) + 1;

const dp = Array.from({ length: LG }, () => new Array(m + 1));

dp[0][0] = 0;
for (let x = 1; x <= m; x++) dp[0][x] = f[x];

for (let k = 1; k < LG; k++) {
  for (let x = 1; x <= m; x++) {
    dp[k][x] = dp[k - 1][dp[k - 1][x]];
  }
}

const out = [];
for (const [n, start] of queries) {
  let x = start;
  let rem = n;
  for (let k = 0; k < LG && rem > 0; k++) {
    if (rem & 1) x = dp[k][x];
    rem >>= 1;
  }
  out.push(x);
}

console.log(out.join("\n"));
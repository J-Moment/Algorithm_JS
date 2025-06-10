const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const N = data[ptr++];
const W = data[ptr++];

const event1 = Array(W + 1);
const event2 = Array(W + 1);
event1[0] = [1, 1];
event2[0] = [N, N];
for (let i = 1; i <= W; i++) {
  const r = data[ptr++];
  const c = data[ptr++];
  event1[i] = [r, c];
  event2[i] = [r, c];
}

const dp = Array.from({ length: W + 1 }, () => new Array(W + 1));
const choice = Array.from({ length: W + 1 }, () => new Uint8Array(W + 1));

for (let i = W; i >= 0; i--) {
  const e1i = event1[i];
  for (let j = W; j >= 0; j--) {
    const k = (i > j ? i : j) + 1;
    if (k > W) {
      dp[i][j] = 0;
    } else {
      const e1k = event1[k];
      const d1 =
        Math.abs(e1i[0] - e1k[0]) + Math.abs(e1i[1] - e1k[1]) + dp[k][j];
      const e2j = event2[j],
        e2k = event2[k];
      const d2 =
        Math.abs(e2j[0] - e2k[0]) + Math.abs(e2j[1] - e2k[1]) + dp[i][k];
      if (d1 <= d2) {
        dp[i][j] = d1;
        choice[i][j] = 1;
      } else {
        dp[i][j] = d2;
        choice[i][j] = 2;
      }
    }
  }
}

const out = [];
out.push(dp[0][0]);
let i = 0,
  j = 0;
for (let step = 1; step <= W; step++) {
  const ch = choice[i][j];
  out.push(ch);
  if (ch === 1) {
    i = step;
  } else {
    j = step;
  }
}

process.stdout.write(out.join("\n"));
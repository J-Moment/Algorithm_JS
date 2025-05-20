const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const tokens = fs.readFileSync(path, "utf8").trim().split(/\s+/).map(Number);

let idx = 0;
const N = tokens[idx++];
const T = tokens[idx++];
const M = tokens[idx++];
const S = tokens[idx++];
const E = tokens[idx++];

let prev = new Array(N).fill(Infinity);
prev[S] = 0;

for (let t = 0; t < T; t++) {
  const curr = prev.slice();

  for (let i = 0; i < M; i++) {
    const x = tokens[idx++];
    const y = tokens[idx++];
    const w = tokens[idx++];

    const costX = prev[x] + w;
    if (costX < curr[y]) curr[y] = costX;

    const costY = prev[y] + w;
    if (costY < curr[x]) curr[x] = costY;
  }

  prev = curr;
}

const answer = prev[E];
console.log(answer === Infinity ? -1 : answer);
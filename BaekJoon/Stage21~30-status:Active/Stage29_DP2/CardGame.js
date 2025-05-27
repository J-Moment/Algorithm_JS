const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split(/\s+/).map(Number);
let p = 0;
const T = input[p++];
const output = [];

for (let tc = 0; tc < T; tc++) {
  const N = input[p++];
  const cards = input.slice(p, p + N);
  p += N;

  let sum = 0;
  for (let v of cards) sum += v;
  const dp = cards.slice();

  for (let i = N - 2; i >= 0; i--) {
    for (let j = i + 1; j < N; j++) {
      const pickLeft  = cards[i] - dp[j];
      const pickRight = cards[j] - dp[j - 1];
      dp[j] = pickLeft > pickRight ? pickLeft : pickRight;
    }
  }

  const diff = dp[N - 1];
  const geunwoo = (sum + diff) >> 1;
  output.push(geunwoo);
}

console.log(output.join("\n"));

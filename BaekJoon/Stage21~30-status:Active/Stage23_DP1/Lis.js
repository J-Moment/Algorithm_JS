const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().split("\n");

let N = +input[0];
let li = input[1].split(" ").map(Number);

const dp = new Array(N);

for (let i = 0; i < N; i++) {
  let max = 0;
  for (let j = 0; j <= i; j++) {
    if (li[j] < li[i]) {
      max = Math.max(max, dp[j]);
    }
  }
  dp[i] = max + 1;
}

console.log(Math.max(...dp));
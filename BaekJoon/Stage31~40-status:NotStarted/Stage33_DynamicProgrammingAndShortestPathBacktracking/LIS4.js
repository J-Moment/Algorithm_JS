const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const dp = Array(n).fill(1);
const prev = Array(n).fill(-1);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i] && dp[i] < dp[j] + 1) {
      dp[i] = dp[j] + 1;
      prev[i] = j;
    }
  }
}

const maxLen = Math.max(...dp);
const endIdx = dp.indexOf(maxLen);

const result = [];
let current = endIdx;
while (current !== -1) {
  result.push(arr[current]);
  current = prev[current];
}
result.reverse();

console.log(maxLen);
console.log(result.join(" "));
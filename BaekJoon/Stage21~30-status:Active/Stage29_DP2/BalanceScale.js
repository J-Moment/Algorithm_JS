const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let scaleWeightCount = Number(input[0]);
const weights = input[1].split(" ").map(Number);
const marblesCount = Number(input[2]);
const marbles = input[3].split(" ").map(Number);

const MAX_WEIGHT = 40000;
const dp = Array.from({ length: scaleWeightCount + 1 }, () =>
  Array(MAX_WEIGHT + 1).fill(false)
);
dp[0][0] = true;

for (let i = 0; i < scaleWeightCount; i++) {
  for (let j = 0; j <= MAX_WEIGHT; j++) {
    if (dp[i][j]) {
      dp[i + 1][j] = true;

      if (j + weights[i] <= MAX_WEIGHT) {
        dp[i + 1][j + weights[i]] = true;
      }

      const diff = Math.abs(j - weights[i]);
      dp[i + 1][diff] = true;
    }
  }
}

const result = marbles.map((marble) => (dp[scaleWeightCount][marble] ? "Y" : "N"));
console.log(result.join(" "));
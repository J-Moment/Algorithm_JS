const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const memories = input[1].split(" ").map(Number);
const costs = input[2].split(" ").map(Number);

const MAX_COST = costs.reduce((a, b) => a + b, 0);
const dp = Array(MAX_COST + 1).fill(0);

for (let i = 0; i < N; i++) {
    for (let j = MAX_COST; j >= costs[i]; j--) {
        dp[j] = Math.max(dp[j], dp[j - costs[i]] + memories[i]);
    }
}

// 최소 비용 찾기
for (let i = 0; i <= MAX_COST; i++) {
    if (dp[i] >= M) {
        console.log(i);
        break;
    }
}
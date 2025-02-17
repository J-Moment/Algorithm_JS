const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = parseInt(input[0]);
let index = 1;

for (let t = 0; t < T; t++) {
    const K = parseInt(input[index]);
    const files = input[index + 1].split(" ").map(Number);
    index += 2;

    const dp = Array.from(Array(K), () => Array(K).fill(0));
    const sum = Array(K).fill(0);

    sum[0] = files[0];
    for (let i = 1; i < K; i++) {
        sum[i] = sum[i - 1] + files[i];
    }

    for (let length = 1; length < K; length++) {
        for (let i = 0; i + length < K; i++) {
            const j = i + length;
            dp[i][j] = Infinity;

            for (let k = i; k < j; k++) {
                let cost = dp[i][k] + dp[k + 1][j] + (sum[j] - (i > 0 ? sum[i - 1] : 0));
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }

    console.log(dp[0][K - 1]);
}
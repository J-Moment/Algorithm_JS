const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);
const INF = Infinity;

const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(INF));
for (let i = 1; i <= n; i++) dp[i][i] = 0;

for (let i = 2; i < 2 + m; i++) {
    const [a, b, c] = input[i].split(' ').map(Number);
    dp[a][b] = Math.min(dp[a][b], c);
}

for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            if (dp[i][j] > dp[i][k] + dp[k][j]) {
                dp[i][j] = dp[i][k] + dp[k][j];
            }
        }
    }
}

let result = '';
for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
        result += (dp[i][j] === INF ? 0 : dp[i][j]) + ' ';
    }
    result += '\n';
}

console.log(result.trim());
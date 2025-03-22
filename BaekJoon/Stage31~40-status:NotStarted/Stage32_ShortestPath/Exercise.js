const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [V, E] = input[0].split(' ').map(Number);
const INF = Infinity;

const dp = Array.from({ length: V + 1 }, () => Array(V + 1).fill(INF));

for (let i = 1; i <= E; i++) {
    const [a, b, c] = input[i].split(' ').map(Number);
    dp[a][b] = c;
}

for (let k = 1; k <= V; k++) {
    for (let i = 1; i <= V; i++) {
        for (let j = 1; j <= V; j++) {
            if (dp[i][j] > dp[i][k] + dp[k][j]) {
                dp[i][j] = dp[i][k] + dp[k][j];
            }
        }
    }
}

let minCycle = INF;
for (let i = 1; i <= V; i++) {
    if (dp[i][i] < minCycle) {
        minCycle = dp[i][i];
    }
}

console.log(minCycle === INF ? -1 : minCycle);
const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let N = Number(input[0]);
let matrix = [];
for(let i = 1 ; i <= N ; i++){
    matrix.push(input[i].split(" ").map(Number));
}

const dp = Array.from({ length: N }, () => Array(N).fill(Infinity));

const p = [];
for (let i = 0; i < N; i++) {
    p.push(matrix[i][0]);
}
p.push(matrix[N - 1][1]);

for (let i = 0; i < N; i++) {
    dp[i][i] = 0;
}

// 행렬 곱셈 최소 비용 계산
for (let len = 2; len <= N; len++) {
    for (let i = 0; i <= N - len; i++) {
        let j = i + len - 1;
        for (let k = i; k < j; k++) {
            let cost = dp[i][k] + dp[k + 1][j] + (p[i] * p[k + 1] * p[j + 1]);
            dp[i][j] = Math.min(dp[i][j], cost);
        }
    }
}

console.log(dp[0][N - 1]);
const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

let N = +input[0];
let li = [];
const dp = Array.from({ length: N }, () => Array(3).fill(0));
let answer = 0;

for(let i = 1; i <= N ; i++){
    li.push(input[i].split(' ').map(Number));
}

dp[0][0] = li[0][0];
dp[0][1] = li[0][1];
dp[0][2] = li[0][2];

for (let i = 1; i < N; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + li[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + li[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + li[i][2];
}

answer = Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]);
console.log(answer);
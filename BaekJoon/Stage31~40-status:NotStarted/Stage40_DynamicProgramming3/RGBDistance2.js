const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input[0]);
const cost = input.slice(1).map(line => line.split(" ").map(Number));

const INF = 1e9;
let answer = INF;

for (let first = 0; first < 3; first++) {

  const dp = Array.from({ length: N }, () => [INF, INF, INF]);
  dp[0][first] = cost[0][first];
  
  for (let i = 1; i < N; i++) {
    // 빨강
    dp[i][0] = cost[i][0] + Math.min(dp[i-1][1], dp[i-1][2]);
    // 초록
    dp[i][1] = cost[i][1] + Math.min(dp[i-1][0], dp[i-1][2]);
    // 파랑
    dp[i][2] = cost[i][2] + Math.min(dp[i-1][0], dp[i-1][1]);
  }
  
  for (let last = 0; last < 3; last++) {
    if (last === first) continue;
    answer = Math.min(answer, dp[N-1][last]);
  }
}

console.log(answer);
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath, "utf8").trim().split("\n");
const N = +input[0];
const M = +input[1];

const adj = Array.from({ length: N+1 }, () => []);
const indegree = Array(N+1).fill(0);
const hasRecipe = Array(N+1).fill(false);

for (let i = 2; i < 2+M; i++) {
  const [X, Y, K] = input[i].split(" ").map(Number);
  adj[Y].push([X, K]);
  indegree[X]++;
  hasRecipe[X] = true;
}

const dp = Array.from({ length: N+1 }, () => Array(N+1).fill(0));

const queue = [];
for (let i = 1; i <= N; i++) {
  if (!hasRecipe[i]) {
    dp[i][i] = 1;
    queue.push(i);
  }
}

while (queue.length) {
  const cur = queue.shift();
  for (const [next, cnt] of adj[cur]) {
    for (let b = 1; b <= N; b++) {
      dp[next][b] += dp[cur][b] * cnt;
    }
    if (--indegree[next] === 0) {
      queue.push(next);
    }
  }
}

for (let b = 1; b <= N; b++) {
  if (dp[N][b] > 0) {
    console.log(`${b} ${dp[N][b]}`);
  }
}
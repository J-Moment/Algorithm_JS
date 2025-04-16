const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array(N + 1).fill(false);
let count = 0;

for (let i = 2; i < 2 + M; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

function dfs(node) {
  visited[node] = true;

  for (const next of graph[node]) {
    if (!visited[next]) {
      count++;
      dfs(next);
    }
  }
}

dfs(1);

console.log(count);
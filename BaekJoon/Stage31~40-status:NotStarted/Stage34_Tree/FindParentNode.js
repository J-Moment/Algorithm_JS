const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const graph = Array.from({ length: n + 1 }, () => []);
const visited = Array(n + 1).fill(false);
const parent = Array(n + 1).fill(0);

for (let i = 1; i < n; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

function dfs(node) {
  visited[node] = true;
  for (const next of graph[node]) {
    if (!visited[next]) {
      parent[next] = node;
      dfs(next);
    }
  }
}

dfs(1);

let result = "";
for (let i = 2; i <= n; i++) {
  result += parent[i] + "\n";
}

console.log(result.trim());
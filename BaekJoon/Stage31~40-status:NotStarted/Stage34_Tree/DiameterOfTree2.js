const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i < input.length; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

let maxDist = 0;
let farNode = 0;

function dfs(node, dist, visited) {
  if (dist > maxDist) {
    maxDist = dist;
    farNode = node;
  }

  for (const [next, cost] of graph[node]) {
    if (!visited[next]) {
      visited[next] = true;
      dfs(next, dist + cost, visited);
    }
  }
}

let visited = Array(n + 1).fill(false);
visited[1] = true;
dfs(1, 0, visited);

visited = Array(n + 1).fill(false);
visited[farNode] = true;
maxDist = 0;
dfs(farNode, 0, visited);

console.log(maxDist);
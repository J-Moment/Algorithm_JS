const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const V = Number(input[0]);
const graph = Array.from({ length: V + 1 }, () => []);

for (let i = 1; i <= V; i++) {
  const info = input[i].split(" ").map(Number);
  const from = info[0];

  for (let j = 1; j < info.length - 1; j += 2) {
    const to = info[j];
    const cost = info[j + 1];
    graph[from].push([to, cost]);
  }
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

let visited = Array(V + 1).fill(false);
visited[1] = true;
dfs(1, 0, visited);

visited = Array(V + 1).fill(false);
visited[farNode] = true;
maxDist = 0;
dfs(farNode, 0, visited);

console.log(maxDist);
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);
const graph = Array.from({ length: n + 1 }, () => []);
const INF = Infinity;

for (let i = 2; i < 2 + m; i++) {
  const [from, to, cost] = input[i].split(" ").map(Number);
  graph[from].push([to, cost]);
}

const [start, end] = input[2 + m].split(" ").map(Number);
const dist = Array(n + 1).fill(INF);
const visited = Array(n + 1).fill(false);
const from = Array(n + 1).fill(0);

const pq = [];
dist[start] = 0;
pq.push([0, start]);

while (pq.length) {
  pq.sort((a, b) => a[0] - b[0]);
  const [curCost, cur] = pq.shift();

  if (visited[cur]) continue;
  visited[cur] = true;

  for (const [next, cost] of graph[cur]) {
    if (dist[next] > dist[cur] + cost) {
      dist[next] = dist[cur] + cost;
      from[next] = cur;
      pq.push([dist[next], next]);
    }
  }
}

const path = [];
let current = end;
while (current !== 0) {
  path.push(current);
  current = from[current];
}
path.reverse();

console.log(dist[end]);
console.log(path.length);
console.log(path.join(" "));
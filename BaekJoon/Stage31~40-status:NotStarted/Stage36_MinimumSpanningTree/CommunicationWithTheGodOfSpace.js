const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const coords = input.slice(1, n + 1).map((line) => line.split(" ").map(Number));
const parent = Array.from({ length: n + 1 }, (_, i) => i);

function find(x) {
  if (x !== parent[x]) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  const rootA = find(a);
  const rootB = find(b);
  if (rootA === rootB) return false;
  parent[rootB] = rootA;
  return true;
}

for (let i = n + 1; i < n + 1 + m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  union(a, b);
}

const edges = [];
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    const dx = coords[i][0] - coords[j][0];
    const dy = coords[i][1] - coords[j][1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    edges.push([i + 1, j + 1, dist]);
  }
}

edges.sort((a, b) => a[2] - b[2]);

let result = 0;

for (const [a, b, cost] of edges) {
  if (union(a, b)) {
    result += cost;
  }
}

console.log(result.toFixed(2));
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);
const edges = [];

for (let i = 1; i <= E; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  edges.push([a, b, c]);
}

edges.sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: V + 1 }, (_, i) => i);

function find(x) {
  if (x !== parent[x]) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(a, b) {
  const rootA = find(a);
  const rootB = find(b);
  if (rootA === rootB) return false;
  parent[rootB] = rootA;
  return true;
}

let totalWeight = 0;
for (const [a, b, cost] of edges) {
  if (union(a, b)) {
    totalWeight += cost;
  }
}

console.log(totalWeight);
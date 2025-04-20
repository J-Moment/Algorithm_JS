const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let idx = 0;
const result = [];

while (true) {
  const [m, n] = input[idx++].split(" ").map(Number);
  if (m === 0 && n === 0) break;

  const edges = [];
  let totalCost = 0;

  for (let i = 0; i < n; i++) {
    const [a, b, cost] = input[idx++].split(" ").map(Number);
    edges.push([a, b, cost]);
    totalCost += cost;
  }

  edges.sort((a, b) => a[2] - b[2]);

  const parent = Array.from({ length: m }, (_, i) => i);

  function find(x) {
    if (parent[x] !== x) {
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

  let mstCost = 0;
  for (const [a, b, cost] of edges) {
    if (union(a, b)) {
      mstCost += cost;
    }
  }

  result.push(totalCost - mstCost);
}

console.log(result.join("\n"));
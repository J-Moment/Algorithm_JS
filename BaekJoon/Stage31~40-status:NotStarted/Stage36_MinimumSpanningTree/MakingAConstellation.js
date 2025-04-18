const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input[0]);
const stars = input.slice(1).map(line => line.split(" ").map(Number));

const edges = [];
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const dx = stars[i][0] - stars[j][0];
    const dy = stars[i][1] - stars[j][1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    edges.push([i, j, dist]);
  }
}

edges.sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: N }, (_, i) => i);

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

let result = 0;
for (const [a, b, cost] of edges) {
  if (union(a, b)) {
    result += cost;
  }
}

console.log(result.toFixed(2));
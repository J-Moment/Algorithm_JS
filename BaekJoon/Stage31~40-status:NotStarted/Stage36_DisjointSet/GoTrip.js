const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);

const parent = Array.from({ length: n + 1 }, (_, i) => i);

function find(x) {
  if (x !== parent[x]) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(a, b) {
  const rootA = find(a);
  const rootB = find(b);
  if (rootA !== rootB) {
    parent[rootB] = rootA;
  }
}

for (let i = 0; i < n; i++) {
  const row = input[2 + i].split(" ").map(Number);
  for (let j = 0; j < n; j++) {
    if (row[j] === 1) {
      union(i + 1, j + 1);
    }
  }
}

const plan = input[2 + n].split(" ").map(Number);
const root = find(plan[0]);
const isConnected = plan.every(city => find(city) === root);

console.log(isConnected ? "YES" : "NO");
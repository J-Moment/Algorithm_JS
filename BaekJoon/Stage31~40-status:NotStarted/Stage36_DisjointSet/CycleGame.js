const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const parent = Array.from({ length: n }, (_, i) => i);

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

let answer = 0;
for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  if (!union(a, b)) {
    answer = i;
    break;
  }
}

console.log(answer);
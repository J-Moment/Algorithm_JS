const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
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

const result = [];

for (let i = 1; i < input.length; i++) {
  const line = input[i].trim();
  if (!line) continue;

  const [cmd, a, b] = line.split(" ").map(Number);
  if (cmd === 0) {
    union(a, b);
  } else if (cmd === 1) {
    result.push(find(a) === find(b) ? "YES" : "NO");
  }
}

console.log(result.join("\n"));
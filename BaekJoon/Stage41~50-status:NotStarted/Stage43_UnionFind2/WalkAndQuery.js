const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let idx = 0;
const [n, m, q] = input[idx++].split(" ").map(Number);

const edges = [];
for (let i = 0; i < m; i++) {
  const [u, v] = input[idx++].split(" ").map(Number);
  edges.push([u, v]);
}

const queries = [];
for (let i = 0; i < q; i++) {
  const [s, t] = input[idx++].split(" ").map(Number);
  queries.push([s, t]);
}

const N = n;
const N2 = n * 2;
const parent = Array(N2 + 1)
  .fill(0)
  .map((_, i) => i);
const sizeEven = Array(N2 + 1).fill(0);
const sizeOdd = Array(N2 + 1).fill(0);

function find(x) {
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a === b) return;
  const totalA = sizeEven[a] + sizeOdd[a];
  const totalB = sizeEven[b] + sizeOdd[b];
  if (totalA < totalB) [a, b] = [b, a];
  parent[b] = a;
  sizeEven[a] += sizeEven[b];
  sizeOdd[a] += sizeOdd[b];
}

for (let v = 1; v <= N; v++) {
  sizeEven[v] = 1;
  sizeOdd[v + N] = 1;
}

for (const [u, v] of edges) {
  union(u, v + N);
  union(u + N, v);
}

const compEvenSize = {};
for (let v = 1; v <= N; v++) {
  const root = find(v);
  compEvenSize[root] = sizeEven[root];
}

const out = [];
for (const [s, t] of queries) {
  const root = find(s);
  const totalEven = compEvenSize[root] || 0;
  if (find(t) === root) {
    out.push(totalEven.toString());
  } else {
    out.push("0");
  }
}

console.log(out.join("\n"));
\
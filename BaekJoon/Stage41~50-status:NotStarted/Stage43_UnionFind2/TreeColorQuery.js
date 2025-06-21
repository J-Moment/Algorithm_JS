const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let idx = 0;
const [N, Q] = input[idx++].split(" ").map(Number);

const parent = Array(N + 1).fill(0);
for (let i = 2; i <= N; i++) {
  parent[i] = +input[idx++];
}

const color = [null];
for (let i = 1; i <= N; i++) {
  color[i] = +input[idx++];
}

const total = N - 1 + Q;
const queries = [];
const removed = Array(N + 1).fill(false);

for (let i = 0; i < total; i++) {
  const [typeStr, nodeStr] = input[idx++].split(" ");
  const type = +typeStr;
  const node = +nodeStr;

  if (type === 1) {
    removed[node] = true;
    queries.push({ type: 1, node });
  } else if (type === 2) {
    queries.push({ type: 2, node });
  }
}

const uf = Array.from({ length: N + 1 }, (_, i) => i);
const compSet = Array.from({ length: N + 1 }, () => new Set());

function find(x) {
  if (uf[x] !== x) uf[x] = find(uf[x]);
  return uf[x];
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a === b) return;

  if (!compSet[a] || !compSet[b]) {
    throw new Error(`compSet undefined: a=${a}, b=${b}`);
  }

  if (compSet[a].size > compSet[b].size) [a, b] = [b, a];

  uf[a] = b;
  for (const val of compSet[a]) {
    compSet[b].add(val);
  }
  compSet[a].clear();
}

for (let i = 1; i <= N; i++) {
  compSet[i].add(color[i]);
}

for (let i = 2; i <= N; i++) {
  if (!removed[i]) {
    union(i, parent[i]);
  }
}

const result = [];

for (let i = total - 1; i >= 0; i--) {
  const { type, node } = queries[i];
  if (type === 1) {
    const p = parent[node];
    if (p !== 0) union(node, p);
  } else {
    const root = find(node);
    result.push(compSet[root].size);
  }
}

console.log(result.reverse().join("\n"));
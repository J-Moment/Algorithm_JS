const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let data = fs.readFileSync(filepath, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;

const N = data[idx++];

const adj = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const u = data[idx++],
    v = data[idx++];
  adj[u].push(v);
  adj[v].push(u);
}

const LOG = Math.floor(Math.log2(N)) + 1;

const parent = Array.from({ length: LOG }, () => Array(N + 1).fill(0));
const depth = Array(N + 1).fill(-1);

const queue = [1];
depth[1] = 0;
for (let q = 0; q < queue.length; q++) {
  const u = queue[q];
  for (const v of adj[u]) {
    if (depth[v] === -1) {
      depth[v] = depth[u] + 1;
      parent[0][v] = u;
      queue.push(v);
    }
  }
}

for (let k = 1; k < LOG; k++) {
  for (let v = 1; v <= N; v++) {
    const mid = parent[k - 1][v];
    parent[k][v] = mid ? parent[k - 1][mid] : 0;
  }
}

function lca(a, b) {
  if (depth[a] < depth[b]) [a, b] = [b, a];
  let diff = depth[a] - depth[b];
  for (let k = 0; diff > 0; k++) {
    if (diff & 1) a = parent[k][a];
    diff >>= 1;
  }
  if (a === b) return a;
  for (let k = LOG - 1; k >= 0; k--) {
    if (parent[k][a] && parent[k][a] !== parent[k][b]) {
      a = parent[k][a];
      b = parent[k][b];
    }
  }
  return parent[0][a];
}

const Q = data[idx++];
const out = [];
for (let i = 0; i < Q; i++) {
  const u = data[idx++],
    v = data[idx++];
  out.push(lca(u, v));
}

console.log(out.join("\n"));
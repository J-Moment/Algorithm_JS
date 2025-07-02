const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin", "utf8")
  .trim()
  .split(/\s+/)
  .map(Number);
let idx = 0;

const T = input[idx++];
const out = [];

for (let tc = 0; tc < T; tc++) {
  const N = input[idx++];
  const adj = Array.from({ length: N + 1 }, () => []);
  const parent = Array(N + 1).fill(0);
  for (let i = 0; i < N - 1; i++) {
    const u = input[idx++],
      v = input[idx++];
    parent[v] = u;
    adj[u].push(v);
  }

  const [a, b] = [input[idx++], input[idx++]];

  let root = 1;
  for (let i = 1; i <= N; i++) {
    if (parent[i] === 0) {
      root = i;
      break;
    }
  }

  const depth = Array(N + 1).fill(-1);
  const queue = [root];
  depth[root] = 0;
  while (queue.length) {
    const u = queue.shift();
    for (const v of adj[u]) {
      depth[v] = depth[u] + 1;
      queue.push(v);
    }
  }

  let u = a,
    v = b;
  while (depth[u] > depth[v]) u = parent[u];
  while (depth[v] > depth[u]) v = parent[v];

  while (u !== v) {
    u = parent[u];
    v = parent[v];
  }

  out.push(u);
}

console.log(out.join("\n"));
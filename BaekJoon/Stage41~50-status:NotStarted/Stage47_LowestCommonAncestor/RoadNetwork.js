const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt","utf8").trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const adj = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < N - 1; i++) {
  const u = input[idx++];
  const v = input[idx++];
  const w = input[idx++];
  adj[u].push([v, w]);
  adj[v].push([u, w]);
}

const LOG = Math.ceil(Math.log2(N)) + 1;
const parent = Array.from({ length: LOG }, () => Array(N + 1).fill(0));
const minEdge = Array.from({ length: LOG }, () => Array(N + 1).fill(Infinity));
const maxEdge = Array.from({ length: LOG }, () => Array(N + 1).fill(0));
const depth = Array(N + 1).fill(-1);

const queue = [1];
depth[1] = 0;
for (let qi = 0; qi < queue.length; qi++) {
  const u = queue[qi];
  for (const [v, w] of adj[u]) {
    if (depth[v] === -1) {
      depth[v] = depth[u] + 1;
      parent[0][v] = u;
      minEdge[0][v] = w;
      maxEdge[0][v] = w;
      queue.push(v);
    }
  }
}

for (let k = 1; k < LOG; k++) {
  for (let v = 1; v <= N; v++) {
    const p = parent[k - 1][v];
    parent[k][v] = parent[k - 1][p];
    minEdge[k][v] = Math.min(minEdge[k - 1][v], minEdge[k - 1][p]);
    maxEdge[k][v] = Math.max(maxEdge[k - 1][v], maxEdge[k - 1][p]);
  }
}

function query(u, v) {
  let mn = Infinity,
    mx = 0;
  if (depth[u] < depth[v]) [u, v] = [v, u];
  let diff = depth[u] - depth[v];
  for (let k = 0; diff; k++, diff >>= 1) {
    if (diff & 1) {
      mn = Math.min(mn, minEdge[k][u]);
      mx = Math.max(mx, maxEdge[k][u]);
      u = parent[k][u];
    }
  }
  if (u === v) return [mn === Infinity ? 0 : mn, mx];
  for (let k = LOG - 1; k >= 0; k--) {
    if (parent[k][u] !== parent[k][v]) {
      mn = Math.min(mn, minEdge[k][u], minEdge[k][v]);
      mx = Math.max(mx, maxEdge[k][u], maxEdge[k][v]);
      u = parent[k][u];
      v = parent[k][v];
    }
  }
  mn = Math.min(mn, minEdge[0][u], minEdge[0][v]);
  mx = Math.max(mx, maxEdge[0][u], maxEdge[0][v]);
  return [mn, mx];
}

const K = input[idx++];
let out = "";
for (let i = 0; i < K; i++) {
  const u = input[idx++];
  const v = input[idx++];
  const [mn, mx] = query(u, v);
  out += mn + " " + mx + "\n";
}

console.log(out);
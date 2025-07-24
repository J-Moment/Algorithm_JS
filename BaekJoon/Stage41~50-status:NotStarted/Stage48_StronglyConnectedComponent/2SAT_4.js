const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let p = 0;

const N = data[p++],
  M = data[p++];
const V = 2 * N;
const g = Array.from({ length: V }, () => []);

const litToId = (x) => {
  const v = Math.abs(x) - 1;
  return x > 0 ? 2 * v : (2 * v) ^ 1;
};
const NEG = (u) => u ^ 1;

for (let i = 0; i < M; i++) {
  const a = data[p++],
    b = data[p++];
  const A = litToId(a),
    B = litToId(b);
  g[NEG(A)].push(B);
  g[NEG(B)].push(A);
}

const dfn = new Int32Array(V).fill(-1);
const low = new Int32Array(V);
const onSt = new Uint8Array(V);
const st = [];
const comp = new Int32Array(V).fill(-1);
let idx = 0,
  sccCnt = 0;

function dfs(u) {
  dfn[u] = low[u] = idx++;
  st.push(u);
  onSt[u] = 1;
  for (const v of g[u]) {
    if (dfn[v] === -1) {
      dfs(v);
      low[u] = Math.min(low[u], low[v]);
    } else if (onSt[v]) {
      low[u] = Math.min(low[u], dfn[v]);
    }
  }
  if (low[u] === dfn[u]) {
    while (true) {
      const v = st.pop();
      onSt[v] = 0;
      comp[v] = sccCnt;
      if (v === u) break;
    }
    sccCnt++;
  }
}

for (let u = 0; u < V; u++) {
  if (dfn[u] === -1) dfs(u);
}

for (let i = 0; i < N; i++) {
  if (comp[2 * i] === comp[2 * i + 1]) {
    console.log(0);
    process.exit(0);
  }
}

const indeg = new Int32Array(sccCnt);
const dag = Array.from({ length: sccCnt }, () => []);
const seen = new Set();

for (let u = 0; u < V; u++) {
  const cu = comp[u];
  for (const v of g[u]) {
    const cv = comp[v];
    if (cu !== cv) {
      const key = cu * sccCnt + cv;
      if (!seen.has(key)) {
        seen.add(key);
        dag[cu].push(cv);
        indeg[cv]++;
      }
    }
  }
}

const q = [];
for (let i = 0; i < sccCnt; i++) {
  if (indeg[i] === 0) q.push(i);
}
const topoIdx = new Int32Array(sccCnt);
let ti = 0;
while (q.length) {
  const c = q.shift();
  topoIdx[c] = ti++;
  for (const nxt of dag[c]) {
    if (--indeg[nxt] === 0) q.push(nxt);
  }
}

const ans = new Array(N);
for (let i = 0; i < N; i++) {
  const t = comp[2 * i],
    f = comp[2 * i + 1];
  ans[i] = topoIdx[t] > topoIdx[f] ? 1 : 0;
}

console.log(1);
console.log(ans.join(" "));
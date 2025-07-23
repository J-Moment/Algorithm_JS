const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let p = 0;

const N = input[p++],
  M = input[p++];
const V = 2 * N; // 노드 수
const g = Array.from({ length: V }, () => []);

const idTrue = (i) => 2 * (i - 1);
const idFalse = (i) => (2 * (i - 1)) ^ 1;
const NOT = (x) => x ^ 1;

for (let k = 0; k < M; k++) {
  const a = input[p++],
    b = input[p++];
  const litToId = (x) => (x > 0 ? idTrue(x) : idFalse(-x));

  const A = litToId(a);
  const B = litToId(b);

  g[NOT(A)].push(B);
  g[NOT(B)].push(A);
}

let idx = 0,
  sccCnt = 0;
const dfn = new Int32Array(V).fill(-1);
const low = new Int32Array(V);
const on = new Uint8Array(V);
const st = [];
const comp = new Int32Array(V).fill(-1);

function dfs(u) {
  dfn[u] = low[u] = idx++;
  st.push(u);
  on[u] = 1;
  for (const v of g[u]) {
    if (dfn[v] === -1) {
      dfs(v);
      low[u] = Math.min(low[u], low[v]);
    } else if (on[v]) {
      low[u] = Math.min(low[u], dfn[v]);
    }
  }
  if (low[u] === dfn[u]) {
    while (true) {
      const v = st.pop();
      on[v] = 0;
      comp[v] = sccCnt;
      if (v === u) break;
    }
    sccCnt++;
  }
}

for (let i = 0; i < V; i++) if (dfn[i] === -1) dfs(i);

for (let i = 1; i <= N; i++) {
  if (comp[idTrue(i)] === comp[idFalse(i)]) {
    console.log(0);
    process.exit(0);
  }
}
console.log(1);
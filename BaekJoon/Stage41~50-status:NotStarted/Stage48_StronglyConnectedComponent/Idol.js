const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0,
  out = [];

while (p < data.length) {
  const n = parseInt(data[p++], 10);
  if (isNaN(n)) break;
  const m = parseInt(data[p++], 10);

  const N = n,
    V = 2 * N;
  const g = Array.from({ length: V }, () => []);

  const litToId = (x) => {
    const v = Math.abs(x) - 1;
    return x > 0 ? v << 1 : (v << 1) ^ 1;
  };
  const neg = (u) => u ^ 1;

  const addClause = (A, B) => {
    g[neg(A)].push(B);
    g[neg(B)].push(A);
  };

  for (let i = 0; i < m; i++) {
    const a = parseInt(data[p++], 10);
    const b = parseInt(data[p++], 10);
    const A = litToId(a),
      B = litToId(b);
    addClause(A, B);
  }

  const x1 = litToId(1);
  addClause(x1, x1);

  const dfn = new Int32Array(V).fill(-1),
    low = new Int32Array(V);
  const onSt = new Uint8Array(V),
    comp = new Int32Array(V).fill(-1);
  const st = [];
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

  let ok = true;
  for (let i = 0; i < N; i++) {
    if (comp[2 * i] === comp[2 * i + 1]) {
      ok = false;
      break;
    }
  }
  out.push(ok ? "yes" : "no");
}

console.log(out.join("\n"));
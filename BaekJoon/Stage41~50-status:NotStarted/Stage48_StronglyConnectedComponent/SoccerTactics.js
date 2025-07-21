const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let p = 0;

const T = input[p++];
let out = [];

for (let tc = 0; tc < T; tc++) {
  const N = input[p++],
    M = input[p++];

  const g = Array.from({ length: N }, () => []);
  for (let i = 0; i < M; i++) {
    const A = input[p++],
      B = input[p++];
    g[A].push(B);
  }

  let idx = 0,
    sccCnt = 0;
  const dfn = new Int32Array(N).fill(-1);
  const low = new Int32Array(N);
  const on = new Uint8Array(N);
  const st = [];
  const comp = new Int32Array(N).fill(-1);

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
  for (let i = 0; i < N; i++) if (dfn[i] === -1) dfs(i);

  const indeg = new Int32Array(sccCnt);
  for (let u = 0; u < N; u++) {
    for (const v of g[u]) {
      if (comp[u] !== comp[v]) indeg[comp[v]]++;
    }
  }

  let zeroComp = -1,
    cntZero = 0;
  for (let i = 0; i < sccCnt; i++) {
    if (indeg[i] === 0) {
      cntZero++;
      zeroComp = i;
      if (cntZero > 1) break;
    }
  }

  if (cntZero !== 1) {
    out.push("Confused");
  } else {
    const ans = [];
    for (let i = 0; i < N; i++) if (comp[i] === zeroComp) ans.push(i);
    ans.sort((a, b) => a - b);
    out.push(ans.join("\n"));
  }

  out.push("");
}

process.stdout.write(out.join("\n"));
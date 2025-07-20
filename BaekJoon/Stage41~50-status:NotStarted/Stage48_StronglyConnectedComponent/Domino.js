const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "./input.txt",
    "utf8"
  )
  .trim()
  .split(/\s+/)
  .map(Number);
let ptr = 0;

const T = input[ptr++];
let answers = new Array(T);

for (let tc = 0; tc < T; tc++) {
  const N = input[ptr++],
    M = input[ptr++];

  const g = Array.from({ length: N + 1 }, () => []);
  const rg = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < M; i++) {
    const u = input[ptr++],
      v = input[ptr++];
    g[u].push(v);
    rg[v].push(u);
  }

  const visited = new Uint8Array(N + 1);
  const order = [];
  function dfs1(start) {
    const st = [start];
    const it = [0];
    visited[start] = 1;
    while (st.length) {
      const v = st[st.length - 1];
      let i = it[it.length - 1];
      if (i < g[v].length) {
        const to = g[v][i];
        it[it.length - 1] = i + 1;
        if (!visited[to]) {
          visited[to] = 1;
          st.push(to);
          it.push(0);
        }
      } else {
        order.push(v);
        st.pop();
        it.pop();
      }
    }
  }
  for (let v = 1; v <= N; v++) if (!visited[v]) dfs1(v);

  const compId = new Int32Array(N + 1).fill(-1);
  let compCnt = 0;
  function dfs2(start, cid) {
    const st = [start];
    compId[start] = cid;
    while (st.length) {
      const v = st.pop();
      for (const to of rg[v])
        if (compId[to] === -1) {
          compId[to] = cid;
          st.push(to);
        }
    }
  }
  for (let i = order.length - 1; i >= 0; i--) {
    const v = order[i];
    if (compId[v] === -1) dfs2(v, compCnt++);
  }

  const indeg = new Int32Array(compCnt);
  for (let u = 1; u <= N; u++) {
    for (const v of g[u]) {
      if (compId[u] !== compId[v]) indeg[compId[v]]++;
    }
  }

  let res = 0;
  for (let i = 0; i < compCnt; i++) if (indeg[i] === 0) res++;
  answers[tc] = String(res);
}

console.log(answers.join("\n"));
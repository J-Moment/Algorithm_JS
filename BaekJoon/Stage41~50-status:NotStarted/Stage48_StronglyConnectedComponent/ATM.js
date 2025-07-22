const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const N = data[ptr++],
  M = data[ptr++];
const g = Array.from({ length: N + 1 }, () => []);
const rg = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const u = data[ptr++],
    v = data[ptr++];
  g[u].push(v);
  rg[v].push(u);
}

const money = new Int32Array(N + 1);
for (let i = 1; i <= N; i++) money[i] = data[ptr++];

const S = data[ptr++],
  P = data[ptr++];
const rest = data.slice(ptr, ptr + P);
ptr += P;

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
function dfs2(start, id) {
  const st = [start];
  compId[start] = id;
  while (st.length) {
    const v = st.pop();
    for (const to of rg[v]) {
      if (compId[to] === -1) {
        compId[to] = id;
        st.push(to);
      }
    }
  }
}
for (let i = order.length - 1; i >= 0; i--) {
  const v = order[i];
  if (compId[v] === -1) dfs2(v, compCnt++);
}

const compMoney = new BigInt64Array(compCnt);
for (let i = 1; i <= N; i++) compMoney[compId[i]] += BigInt(money[i]);

const startComp = compId[S];
const isRest = new Uint8Array(compCnt);
for (const r of rest) isRest[compId[r]] = 1;

const indeg = new Int32Array(compCnt);
const dag = Array.from({ length: compCnt }, () => []);
const seen = new Set();
for (let u = 1; u <= N; u++) {
  const cu = compId[u];
  for (const v of g[u]) {
    const cv = compId[v];
    if (cu !== cv) {
      const key = cu * compCnt + cv;
      if (!seen.has(key)) {
        seen.add(key);
        dag[cu].push(cv);
        indeg[cv]++;
      }
    }
  }
}

const dp = new BigInt64Array(compCnt).fill(-1n);
dp[startComp] = compMoney[startComp];

const q = [];
const indegTmp = indeg.slice();
const queue = [];
for (let i = 0; i < compCnt; i++) if (indegTmp[i] === 0) queue.push(i);

while (queue.length) {
  const u = queue.shift();
  for (const v of dag[u]) {
    if (dp[u] !== -1n) {
      const cand = dp[u] + compMoney[v];
      if (cand > dp[v]) dp[v] = cand;
    }
    if (--indegTmp[v] === 0) queue.push(v);
  }
}

let ans = 0n;
for (let i = 0; i < compCnt; i++) {
  if (isRest[i] && dp[i] > ans) ans = dp[i];
}

console.log(ans.toString());
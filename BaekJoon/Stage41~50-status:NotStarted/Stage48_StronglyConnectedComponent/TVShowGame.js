const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let ptr = 0;

const k = +input[ptr++];
const n = +input[ptr++];

const N = k << 1;
const g = Array.from({ length: N }, () => []);
const gr = Array.from({ length: N }, () => []);

const lit = (i, isTrue) => ((i - 1) << 1) + (isTrue ? 0 : 1);
const inv = (u) => u ^ 1;

function addOr(u, v) {
  g[inv(u)].push(v);
  g[inv(v)].push(u);
  gr[v].push(inv(u));
  gr[u].push(inv(v));
}

for (let i = 0; i < n; i++) {
  const a = +input[ptr++];
  const ca = input[ptr++];
  const b = +input[ptr++];
  const cb = input[ptr++];
  const c = +input[ptr++];
  const cc = input[ptr++];

  const la = lit(a, ca === "R");
  const lb = lit(b, cb === "R");
  const lc = lit(c, cc === "R");

  addOr(la, lb);
  addOr(lb, lc);
  addOr(lc, la);
}

const order = [];
const used = Array(N).fill(false);
function dfs1(u) {
  used[u] = true;
  for (const v of g[u]) {
    if (!used[v]) dfs1(v);
  }
  order.push(u);
}
for (let u = 0; u < N; u++) {
  if (!used[u]) dfs1(u);
}

const comp = Array(N).fill(-1);
let cid = 0;
function dfs2(u) {
  comp[u] = cid;
  for (const v of gr[u]) {
    if (comp[v] === -1) dfs2(v);
  }
}
for (let i = N - 1; i >= 0; i--) {
  const u = order[i];
  if (comp[u] === -1) {
    dfs2(u);
    cid++;
  }
}

for (let i = 0; i < k; i++) {
  if (comp[i << 1] === comp[(i << 1) ^ 1]) {
    console.log(-1);
    process.exit(0);
  }
}

let ans = "";
for (let i = 0; i < k; i++) {
  const t = comp[i << 1];
  const f = comp[(i << 1) ^ 1];
  ans += t > f ? "R" : "B";
}

console.log(ans);
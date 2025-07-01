const fs = require("fs");
const [first, line] = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
const [N, K] = first.split(" ").map(Number);
const A = line.split(" ").map(Number);

const revA = Array.from({ length: N }, (_, i) => A[N - 1 - i]);

const L = 2 * N;
const S = new Array(L);
for (let i = 0; i < N; i++) S[i] = revA[i];
for (let i = 0; i < N; i++) S[N + i] = revA[i];

let sa = Array.from({ length: L }, (_, i) => i);
let rank = S.slice();
let tmp = new Array(L);
for (let k = 1; k < L; k <<= 1) {
  const maxR = Math.max(...rank) + 1;
  let cnt = new Array(maxR + 1).fill(0);
  for (let i = 0; i < L; i++) {
    const r = sa[i] + k < L ? rank[sa[i] + k] + 1 : 0;
    cnt[r]++;
  }
  for (let i = 1; i < cnt.length; i++) cnt[i] += cnt[i - 1];
  let sa2 = new Array(L);
  for (let i = L - 1; i >= 0; i--) {
    const j = sa[i],
      r = j + k < L ? rank[j + k] + 1 : 0;
    sa2[--cnt[r]] = j;
  }
  cnt = new Array(maxR + 1).fill(0);
  for (let i = 0; i < L; i++) cnt[rank[i] + 1]++;
  for (let i = 1; i < cnt.length; i++) cnt[i] += cnt[i - 1];
  for (let i = L - 1; i >= 0; i--) {
    const j = sa2[i];
    sa[--cnt[rank[j] + 1]] = j;
  }
  tmp[sa[0]] = 0;
  for (let i = 1; i < L; i++) {
    const a = sa[i - 1],
      b = sa[i];
    const ra1 = rank[a],
      rb1 = rank[b];
    const ra2 = a + k < L ? rank[a + k] : -1,
      rb2 = b + k < L ? rank[b + k] : -1;
    tmp[b] = ra1 !== rb1 || ra2 !== rb2 ? tmp[a] + 1 : tmp[a];
  }
  for (let i = 0; i < L; i++) rank[i] = tmp[i];
  if (rank[sa[L - 1]] === L - 1) break;
}

let cntR = 0;
for (const p of sa) {
  if (p > 0 && p < N) {
    cntR++;
    if (cntR === K) {
      const out = [];
      for (let i = 0; i < N; i++) out.push(S[p + i]);
      console.log(out.join(" "));
      process.exit(0);
    }
  }
}
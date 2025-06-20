const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);

const parent = Array(n * 2 + 1)
  .fill(0)
  .map((_, i) => i);

function find(x) {
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a !== b) parent[a] = b;
}

for (let i = 2; i < m + 2; i++) {
  const [type, ps, qs] = input[i].split(" ");
  const p = Number(ps);
  const q = Number(qs);

  if (type === "F") {
    union(p, q);
    union(p + n, q + n);
  } else {
    union(p, q + n);
    union(p + n, q);
  }
}

const seen = new Set();
for (let i = 1; i <= n; i++) {
  let rep = find(i);
  let opp = find(i + n);

  let key = Math.min(rep, opp) + "," + Math.max(rep, opp);
  seen.add(key);
}

console.log(seen.size);
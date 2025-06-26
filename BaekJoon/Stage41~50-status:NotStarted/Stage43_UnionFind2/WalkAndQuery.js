const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, Q] = input[0].split(" ").map(Number);
const parent = Array.from({ length: N + 1 }, (_, i) => i);
const color = Array(N + 1).fill(0);
const compSize = Array(N + 1).fill(1);
const hasOddCycle = Array(N + 1).fill(false);
let answer = 0;
const output = [];

function find(x) {
  if (parent[x] !== x) {
    const origParent = parent[x];
    const root = find(origParent);
    parent[x] = root;
    color[x] ^= color[origParent];
  }
  return parent[x];
}

function union(u, v) {
  const ru = find(u);
  const rv = find(v);

  if (ru === rv) {
    if ((color[u] ^ color[v]) === 0 && !hasOddCycle[ru]) {
      hasOddCycle[ru] = true;
      answer += compSize[ru];
    }
    return;
  }

  if (compSize[ru] < compSize[rv]) {
    [u, v] = [v, u];
  }

  const ruNew = find(u);
  const rvNew = find(v);

  const before =
    (hasOddCycle[ruNew] ? compSize[ruNew] : 0) +
    (hasOddCycle[rvNew] ? compSize[rvNew] : 0);

  parent[rvNew] = ruNew;
  color[rvNew] = color[u] ^ color[v] ^ 1;
  compSize[ruNew] += compSize[rvNew];
  hasOddCycle[ruNew] =
    hasOddCycle[ruNew] || hasOddCycle[rvNew] || (color[u] ^ color[v]) === 0;

  const after = hasOddCycle[ruNew] ? compSize[ruNew] : 0;
  answer += after - before;
}

for (let i = 1; i <= Q; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  union(u, v);
  output.push(answer);
}

console.log(output.join("\n"));
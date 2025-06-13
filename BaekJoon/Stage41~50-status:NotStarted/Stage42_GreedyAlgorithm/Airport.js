const fs = require("fs");

const [G, P, ...rest] = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const parent = new Uint32Array(G + 1);
for (let i = 0; i <= G; i++) parent[i] = i;

function find(x) {
  let p = parent[x];
  if (p === x) return x;
  return (parent[x] = find(p));
}

let ans = 0;
let ptr = 0;
for (let i = 0; i < P; i++) {
  const g = rest[ptr++];
  const root = find(g);
  if (root === 0) break;
  ans++;
  parent[root] = find(root - 1);
}

console.log(ans);
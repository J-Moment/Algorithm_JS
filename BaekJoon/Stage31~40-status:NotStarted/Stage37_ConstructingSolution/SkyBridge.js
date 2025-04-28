const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);

const original = new Set();
for (let i = 1; i < n; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  const a = Math.min(u, v),
    b = Math.max(u, v);
  original.add(`${a}#${b}`);
}

const adj = Array.from({ length: n + 1 }, () => new Set());
for (const e of original) {
  const [a, b] = e.split("#").map(Number);
  adj[a].add(b);
  adj[b].add(a);
}

const missing = [];
for (let i = 1; i <= n; i++) {
  for (let j = i + 1; j <= n; j++) {
    if (!original.has(`${i}#${j}`)) {
      missing.push([i, j]);
    }
  }
}

const K = Math.min(missing.length, n - 1);
const added = missing.slice(0, K);

for (const [u, v] of added) {
  adj[u].add(v);
  adj[v].add(u);
}

function bfs(start) {
  const dist = Array(n + 1).fill(-1);
  const q = [start];
  dist[start] = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const u = q[qi];
    for (const v of adj[u]) {
      if (dist[v] === -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }
  let far = start,
    maxd = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] > maxd) {
      maxd = dist[i];
      far = i;
    }
  }
  return { far, maxd };
}

const { far: x } = bfs(1);
const { maxd: R } = bfs(x);

console.log(K);
console.log(R);
for (const [u, v] of added) {
  console.log(u, v);
}
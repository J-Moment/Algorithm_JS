const fs = require("fs");
const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt","utf8").trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const M = input[idx++];

const adj = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0);

for (let i = 0; i < M; i++) {
  const A = input[idx++];
  const B = input[idx++];
  adj[A].push(B);
  indegree[B]++;
}

const q = [];
for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) q.push(i);
}

const result = [];
let head = 0;

while (head < q.length) {
  const u = q[head++];
  result.push(u);
  for (const v of adj[u]) {
    if (--indegree[v] === 0) {
      q.push(v);
    }
  }
}

console.log(result.join(" "));
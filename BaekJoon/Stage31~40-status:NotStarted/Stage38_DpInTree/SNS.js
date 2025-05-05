const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let lines = fs.readFileSync(filepath).toString().trim().split("\n");

const N = +lines[0];

const adj = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i <= N - 1; i++) {
  const [u, v] = lines[i].split(" ").map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

const dp0 = new Array(N + 1).fill(0);
const dp1 = new Array(N + 1).fill(0);

const parent = new Array(N + 1).fill(0);

const stack = [[1, 0, false]];
const order = [];

while (stack.length) {
  const [u, p, visited] = stack.pop();
  if (!visited) {
    parent[u] = p;
    stack.push([u, p, true]);
    for (const v of adj[u]) {
      if (v === p) continue;
      stack.push([v, u, false]);
    }
  } else {
    order.push(u);
  }
}

for (const u of order) {
  dp1[u] = 1;
  dp0[u] = 0;
  for (const v of adj[u]) {
    if (v === parent[u]) continue;
    dp1[u] += Math.min(dp0[v], dp1[v]);
    dp0[u] += dp1[v];
  }
}

const answer = Math.min(dp0[1], dp1[1]);
console.log(answer);
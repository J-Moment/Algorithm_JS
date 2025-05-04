const fs = require('fs');
const lines = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\n');

const n = +lines[0];
const weight = [0, ...lines[1].split(' ').map(Number)];

const adj = Array.from({ length: n + 1 }, () => []);
for (let i = 2; i < 2 + (n - 1); i++) {
  const [u, v] = lines[i].split(' ').map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

const parent = Array(n + 1).fill(0);
parent[1] = -1;
const order = [];
const stack = [1];
while (stack.length) {
  const u = stack.pop();
  order.push(u);
  for (const v of adj[u]) {
    if (parent[v] === 0) {
      parent[v] = u;
      stack.push(v);
    }
  }
}

const dp0 = Array(n + 1).fill(0);
const dp1 = Array(n + 1).fill(0);
for (let i = order.length - 1; i >= 0; i--) {
  const u = order[i];
  dp1[u] = weight[u];
  dp0[u] = 0;
  for (const v of adj[u]) {
    if (v === parent[u]) continue;
    dp1[u] += dp0[v];
    dp0[u] += Math.max(dp0[v], dp1[v]);
  }
}

const answerWeight = Math.max(dp0[1], dp1[1]);

const result = [];
const trace = [[1, false]];
while (trace.length) {
  const [u, parSel] = trace.pop();
  const sel = !parSel && dp1[u] > dp0[u];
  if (sel) result.push(u);
  for (const v of adj[u]) {
    if (v === parent[u]) continue;
    trace.push([v, sel]);
  }
}

result.sort((a, b) => a - b);
console.log(answerWeight);
console.log(result.join(' '));

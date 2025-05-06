const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input[0]);
const residents = [0, ...input[1].split(' ').map(Number)];

const adj = Array.from({ length: N + 1 }, () => []);
for (let i = 2; i < 2 + (N - 1); i++) {
  const [u, v] = input[i].split(' ').map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

const dp0 = new Array(N + 1).fill(0);
const dp1 = new Array(N + 1).fill(0);

const stack = [[1, 0, false]];
while (stack.length) {
  const [u, p, visited] = stack.pop();
  if (!visited) {
    stack.push([u, p, true]);
    for (const v of adj[u]) {
      if (v === p) continue;
      stack.push([v, u, false]);
    }
  } else {
    dp1[u] = residents[u];
    dp0[u] = 0;
    for (const v of adj[u]) {
      if (v === p) continue;
      dp1[u] += dp0[v];
      dp0[u] += Math.max(dp0[v], dp1[v]);
    }
  }
}

const answer = Math.max(dp0[1], dp1[1]);
console.log(answer);
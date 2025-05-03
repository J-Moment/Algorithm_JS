const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, R, Q] = input[0].split(' ').map(Number);

const adj = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i < N; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  adj[u].push(v);
  adj[v].push(u);
}

const parent = Array(N + 1).fill(0);
parent[R] = -1;
const stack = [R];
const order = [];

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

const subtreeSize = Array(N + 1).fill(0);
for (let i = order.length - 1; i >= 0; i--) {
  const u = order[i];
  subtreeSize[u] = 1;
  for (const v of adj[u]) {
    if (parent[v] === u) {
      subtreeSize[u] += subtreeSize[v];
    }
  }
}

let output = '';
for (let i = N; i < N + Q; i++) {
  const qNode = Number(input[i]);
  output += subtreeSize[qNode] + '\n';
}

console.log(output);
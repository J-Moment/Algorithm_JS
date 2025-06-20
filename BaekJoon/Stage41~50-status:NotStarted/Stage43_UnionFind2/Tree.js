const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let idx = 0;
const [N, Q] = input[idx++].split(" ").map(Number);

const parent = Array(N + 1);
parent[1] = 0;
for (let i = 2; i <= N; i++) {
  parent[i] = +input[idx++];
}

const total = N - 1 + Q;
const commands = [];
const removed = Array(N + 1).fill(false);

for (let i = 0; i < total; i++) {
  const parts = input[idx++].split(" ").map(Number);
  if (parts[0] === 0) {
    commands.push({ type: 0, b: parts[1] });
    removed[parts[1]] = true;
  } else {
    commands.push({ type: 1, c: parts[1], d: parts[2] });
  }
}

const uf = Array(N + 1)
  .fill(0)
  .map((_, i) => i);
function find(x) {
  if (uf[x] !== x) uf[x] = find(uf[x]);
  return uf[x];
}
function union(a, b) {
  a = find(a);
  b = find(b);
  if (a !== b) uf[b] = a;
}

for (let i = 2; i <= N; i++) {
  if (!removed[i]) {
    union(i, parent[i]);
  }
}

const result = [];
for (let i = total - 1; i >= 0; i--) {
  const cmd = commands[i];
  if (cmd.type === 1) {
    result.push(find(cmd.c) === find(cmd.d) ? "YES" : "NO");
  } else {
    union(cmd.b, parent[cmd.b]);
  }
}

console.log(result.reverse().join("\n"));
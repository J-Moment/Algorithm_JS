const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, Q] = input[0].split(" ").map(Number);

const sets = Array.from({ length: N + 1 }, () => new Set());
const owner = new Map();

for (let i = 1; i <= N; i++) {
  const [_, ...rest] = input[i].split(" ").map(Number);
  for (const val of rest) {
    sets[i].add(val);
    owner.set(val, i);
  }
}

const output = [];

for (let i = N + 1; i < N + 1 + Q; i++) {
  const parts = input[i].split(" ");
  if (parts[0] === "1") {
    const a = Number(parts[1]);
    const b = Number(parts[2]);

    if (a === b || sets[b].size === 0) continue;

    if (sets[a].size < sets[b].size) {
      [sets[a], sets[b]] = [sets[b], sets[a]];
      for (const val of sets[b]) owner.set(val, a);
      for (const val of sets[b]) sets[a].add(val);
      sets[b].clear();
    } else {
      for (const val of sets[b]) {
        sets[a].add(val);
        owner.set(val, a);
      }
      sets[b].clear();
    }
  } else if (parts[0] === "2") {
    const a = Number(parts[1]);
    output.push(sets[a].size);
  }
}

console.log(output.join("\n"));
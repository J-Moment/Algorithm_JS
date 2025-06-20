const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +input[0];
const m = +input[1];

const parent = Array.from({ length: n + 1 }, (_, i) => i);

function find(x) {
  return parent[x] === x ? x : (parent[x] = find(parent[x]));
}

function union(a, b) {
  a = find(a);
  b = find(b);
  if (a !== b) parent[b] = a;
}

const enemy = Array.from({ length: n + 1 }, () => []);

for (let i = 2; i < m + 2; i++) {
  const [type, pStr, qStr] = input[i].split(" ");
  const p = +pStr;
  const q = +qStr;

  if (type === "F") {
    union(p, q);
  } else {
    enemy[p].push(q);
    enemy[q].push(p);
  }
}

for (let i = 1; i <= n; i++) {
  const e = enemy[i];
  for (let j = 0; j < e.length; j++) {
    for (let k = j + 1; k < e.length; k++) {
      union(e[j], e[k]);
    }
  }
}

const set = new Set();
for (let i = 1; i <= n; i++) {
  set.add(find(i));
}

console.log(set.size);
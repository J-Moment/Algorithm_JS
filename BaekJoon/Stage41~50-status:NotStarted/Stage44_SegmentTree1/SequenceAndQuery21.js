const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const N = data[ptr++];

const tree = new Array(N + 2).fill(0);
function bitAdd(i, v) {
  for (; i <= N; i += i & -i) tree[i] += v;
}
function bitSum(i) {
  let s = 0;
  for (; i > 0; i -= i & -i) s += tree[i];
  return s;
}

let prev = 0;
for (let i = 1; i <= N; i++) {
  const cur = data[ptr++];
  bitAdd(i, cur - prev);
  prev = cur;
}

const Q = data[ptr++];

const out = [];
for (let qi = 0; qi < Q; qi++) {
  const type = data[ptr++];
  if (type === 1) {
    const l = data[ptr++];
    const r = data[ptr++];
    const v = data[ptr++];
    bitAdd(l, v);
    if (r + 1 <= N) bitAdd(r + 1, -v);
  } else {
    const x = data[ptr++];
    out.push(bitSum(x));
  }
}

process.stdout.write(out.join("\n") + "\n");
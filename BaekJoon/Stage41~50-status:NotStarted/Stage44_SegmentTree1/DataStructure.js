const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const N = data[ptr++];
const MAX = 2000000;
const tree = new Int32Array(MAX + 1);

function update(idx, v) {
  for (; idx <= MAX; idx += idx & -idx) {
    tree[idx] += v;
  }
}

function prefixSum(idx) {
  let s = 0;
  for (; idx > 0; idx -= idx & -idx) {
    s += tree[idx];
  }
  return s;
}

let bit = 1;
while (bit * 2 <= MAX) bit <<= 1;

function findKth(k) {
  let pos = 0;
  for (let step = bit; step > 0; step >>= 1) {
    if (pos + step <= MAX && tree[pos + step] < k) {
      k -= tree[pos + step];
      pos += step;
    }
  }
  return pos + 1;
}

const out = [];
for (let qi = 0; qi < N; qi++) {
  const t = data[ptr++];
  const x = data[ptr++];
  if (t === 1) {
    update(x, 1);
  } else {
    const val = findKth(x);
    out.push(val);
    update(val, -1);
  }
}

process.stdout.write(out.join("\n") + "\n");
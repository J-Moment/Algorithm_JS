const fs = require("fs");

const MOD = 1000000007n;

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let ptr = 0;

const N = parseInt(input[ptr++], 10);
const M = parseInt(input[ptr++], 10);
const K = parseInt(input[ptr++], 10);

let size = 1;
while (size < N) size <<= 1;

const tree = new Array(size * 2).fill(1n);

for (let i = 0; i < N; i++) {
  const val = BigInt(input[ptr++]);
  tree[size + i] = val % MOD;
}

for (let idx = size - 1; idx >= 1; idx--) {
  tree[idx] = (tree[idx * 2] * tree[idx * 2 + 1]) % MOD;
}

function update(pos, newVal) {
  let idx = size + pos - 1;
  tree[idx] = newVal % MOD;

  idx >>= 1;
  while (idx >= 1) {
    tree[idx] = (tree[idx * 2] * tree[idx * 2 + 1]) % MOD;
    idx >>= 1;
  }
}

function rangeProduct(l, r) {
  let res = 1n;
  let left = size + l - 1;
  let right = size + r - 1;

  while (left <= right) {
    if ((left & 1) === 1) {
      res = (res * tree[left]) % MOD;
      left++;
    }
    if ((right & 1) === 0) {
      res = (res * tree[right]) % MOD;
      right--;
    }
    left >>= 1;
    right >>= 1;
  }
  return res;
}

const out = [];
const totalOps = M + K;
for (let qi = 0; qi < totalOps; qi++) {
  const type = parseInt(input[ptr++], 10);
  const b = parseInt(input[ptr++], 10);
  const c = BigInt(input[ptr++]);

  if (type === 1) {
    update(b, c);
  } else {
    const r = Number(c);
    out.push(rangeProduct(b, r).toString());
  }
}

process.stdout.write(out.join("\n"));
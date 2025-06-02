const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let ptr = 0;

const N = parseInt(input[ptr++], 10);
const M = parseInt(input[ptr++], 10);
const K = parseInt(input[ptr++], 10);

const arr = Array(N + 1);
for (let i = 1; i <= N; i++) {
  arr[i] = BigInt(input[ptr++]);
}

const tree = Array(N + 1).fill(0n);

for (let i = 1; i <= N; i++) {
  tree[i] += arr[i];
  const j = i + (i & -i);
  if (j <= N) tree[j] += tree[i];
}

function prefixSum(idx) {
  let s = 0n;
  while (idx > 0) {
    s += tree[idx];
    idx -= idx & -idx;
  }
  return s;
}

function rangeSum(l, r) {
  return prefixSum(r) - prefixSum(l - 1);
}

function bitUpdate(idx, diff) {
  let i = idx;
  while (i <= N) {
    tree[i] += diff;
    i += i & -i;
  }
}

const output = [];
const totalQ = M + K;

for (let qi = 0; qi < totalQ; qi++) {
  const type = parseInt(input[ptr++], 10);
  const b = parseInt(input[ptr++], 10);
  const c = BigInt(input[ptr++]);
  if (type === 1) {
    const oldVal = arr[b];
    const diff = c - oldVal;
    arr[b] = c;
    if (diff !== 0n) {
      bitUpdate(b, diff);
    }
  } else {
    const r = Number(c);
    const sum = rangeSum(b, r);
    output.push(sum.toString());
  }
}

process.stdout.write(output.join("\n"));
const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const T = data[ptr++];

const output = [];

for (let _ = 0; _ < T; _++) {
  const N = data[ptr++];
  const K = data[ptr++];

  const arr = new Array(N);
  for (let i = 0; i < N; i++) {
    arr[i] = i;
  }

  let size = 1;
  while (size < N) size <<= 1;

  const segMin = new Array(size * 2).fill(Infinity);
  const segMax = new Array(size * 2).fill(-Infinity);

  for (let i = 0; i < N; i++) {
    segMin[size + i] = i;
    segMax[size + i] = i;
  }
  for (let idx = size - 1; idx >= 1; idx--) {
    segMin[idx] = Math.min(segMin[idx << 1], segMin[(idx << 1) | 1]);
    segMax[idx] = Math.max(segMax[idx << 1], segMax[(idx << 1) | 1]);
  }

  function update(pos, newVal) {
    let idx = size + pos;
    segMin[idx] = newVal;
    segMax[idx] = newVal;
    idx >>= 1;
    while (idx >= 1) {
      segMin[idx] = Math.min(segMin[idx << 1], segMin[(idx << 1) | 1]);
      segMax[idx] = Math.max(segMax[idx << 1], segMax[(idx << 1) | 1]);
      idx >>= 1;
    }
  }

  function rangeQuery(l, r) {
    l += size;
    r += size;
    let mn = Infinity;
    let mx = -Infinity;
    while (l <= r) {
      if ((l & 1) === 1) {
        mn = Math.min(mn, segMin[l]);
        mx = Math.max(mx, segMax[l]);
        l++;
      }
      if ((r & 1) === 0) {
        mn = Math.min(mn, segMin[r]);
        mx = Math.max(mx, segMax[r]);
        r--;
      }
      l >>= 1;
      r >>= 1;
    }
    return [mn, mx];
  }

  for (let qi = 0; qi < K; qi++) {
    const type = data[ptr++];
    const a = data[ptr++];
    const b = data[ptr++];
    if (type === 0) {
      const va = arr[a];
      const vb = arr[b];
      arr[a] = vb;
      arr[b] = va;
      update(a, vb);
      update(b, va);
    } else {
      const l = Math.min(a, b);
      const r = Math.max(a, b);
      const [mn, mx] = rangeQuery(l, r);
      output.push(mn === l && mx === r ? "YES" : "NO");
    }
  }
}

process.stdout.write(output.join("\n"));
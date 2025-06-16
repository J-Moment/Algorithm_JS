const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const T = data[ptr++];

class MinHeap {
  constructor() {
    this.a = [];
  }
  size() {
    return this.a.length;
  }
  push(v) {
    const a = this.a;
    let i = a.length;
    a.push(v);
    // sift up
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p] <= v) break;
      a[i] = a[p];
      i = p;
    }
    a[i] = v;
  }
  pop() {
    const a = this.a;
    const n = a.length;
    if (n === 0) return undefined;
    const ret = a[0];
    const last = a.pop();
    if (n > 1) {
      let i = 0;
      a[0] = last;
      const half = (n - 1) >> 1;
      // sift down
      while (i < half) {
        let l = (i << 1) + 1;
        let r = l + 1;
        let c = r < n - 1 && a[r] < a[l] ? r : l;
        if (a[c] >= last) break;
        a[i] = a[c];
        i = c;
      }
      a[i] = last;
    }
    return ret;
  }
}

const out = [];
for (let tc = 0; tc < T; tc++) {
  const N = data[ptr++];
  const K = data[ptr++];
  const heap = new MinHeap();
  for (let i = 0; i < N; i++) {
    heap.push(data[ptr++]);
  }
  const mod = (N - 1) % (K - 1);
  const m = mod === 0 ? 0 : K - 1 - mod;
  for (let i = 0; i < m; i++) {
    heap.push(0);
  }
  let cost = 0;
  while (heap.size() > 1) {
    let s = 0;
    for (let i = 0; i < K; i++) {
      s += heap.pop();
    }
    cost += s;
    heap.push(s);
  }
  out.push(cost);
}

console.log(out.join("\n"));
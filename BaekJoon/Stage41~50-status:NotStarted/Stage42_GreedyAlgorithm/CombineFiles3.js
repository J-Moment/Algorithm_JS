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
      while (i < half) {
        let l = (i << 1) + 1;
        let r = l + 1;
        let child = r < n - 1 && a[r] < a[l] ? r : l;
        if (a[child] >= last) break;
        a[i] = a[child];
        i = child;
      }
      a[i] = last;
    }
    return ret;
  }
}

const out = [];
for (let tc = 0; tc < T; tc++) {
  const K = data[ptr++];
  const heap = new MinHeap();
  for (let i = 0; i < K; i++) {
    heap.push(data[ptr++]);
  }
  let cost = 0;
  while (heap.size() > 1) {
    const a = heap.pop();
    const b = heap.pop();
    const s = a + b;
    cost += s;
    heap.push(s);
  }
  out.push(cost);
}

process.stdout.write(out.join("\n") + "\n");
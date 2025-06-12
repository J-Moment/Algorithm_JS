const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const T = data[ptr++];

class MinHeap {
  constructor(arr) {
    this.a = arr;
    this._heapify();
  }
  _heapify() {
    const a = this.a;
    const n = a.length;
    for (let i = (n >> 1) - 1; i >= 0; --i) {
      this._siftDown(i, n);
    }
  }
  _siftDown(i, n) {
    const a = this.a;
    const v = a[i];
    const half = n >> 1;
    while (i < half) {
      let l = (i << 1) + 1;
      let r = l + 1;
      let child = r < n && a[r] < a[l] ? r : l;
      if (a[child] >= v) break;
      a[i] = a[child];
      i = child;
    }
    a[i] = v;
  }
  pop() {
    const a = this.a;
    const n = a.length;
    const res = a[0];
    const last = a.pop();
    if (n > 1) {
      this._siftDown(0, n - 1);
      a[0] = last;
    }
    return res;
  }
  push(x) {
    const a = this.a;
    let i = a.length;
    a.push(x);
    let v = x;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (a[p] <= v) break;
      a[i] = a[p];
      i = p;
    }
    a[i] = v;
  }
  size() {
    return this.a.length;
  }
}

const out = [];
for (let t = 0; t < T; t++) {
  const K = data[ptr++];
  const arr = data.slice(ptr, ptr + K);
  ptr += K;
  const heap = new MinHeap(arr);
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
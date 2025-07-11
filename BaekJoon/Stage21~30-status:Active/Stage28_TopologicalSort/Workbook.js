const fs = require("fs");
const data = fs.readFileSync("/dev/stdin", "utf8").trim().split(/\s+/).map(Number);

let idx = 0;
const N = data[idx++];
const M = data[idx++];

const adj = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0);

for (let i = 0; i < M; i++) {
  const a = data[idx++];
  const b = data[idx++];
  adj[a].push(b);
  indegree[b]++;
}

class MinHeap {
  constructor() {
    this.h = [];
  }
  push(x) {
    this.h.push(x);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }
  pop() {
    const h = this.h;
    const ret = h[0];
    const x = h.pop();
    if (h.length) {
      h[0] = x;
      let i = 0,
        n = h.length;
      while (true) {
        let l = 2 * i + 1,
          r = 2 * i + 2,
          smallest = i;
        if (l < n && h[l] < h[smallest]) smallest = l;
        if (r < n && h[r] < h[smallest]) smallest = r;
        if (smallest === i) break;
        [h[i], h[smallest]] = [h[smallest], h[i]];
        i = smallest;
      }
    }
    return ret;
  }
  size() {
    return this.h.length;
  }
}

const heap = new MinHeap();
for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) heap.push(i);
}

const ans = [];
while (heap.size() > 0) {
  const u = heap.pop();
  ans.push(u);
  for (const v of adj[u]) {
    if (--indegree[v] === 0) {
      heap.push(v);
    }
  }
}

console.log(ans.join(" "));
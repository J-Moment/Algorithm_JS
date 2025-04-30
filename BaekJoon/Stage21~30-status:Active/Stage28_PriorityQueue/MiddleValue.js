const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const data = fs.readFileSync(filePath).toString().trim().split(/\s+/).map(Number);

let idx = 0;
const T = data[idx++];

class Heap {
  constructor(compare) {
    this.compare = compare;
    this.data = [];
  }
  size() {
    return this.data.length;
  }
  peek() {
    return this.data[0];
  }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.compare(this.data[i], this.data[p])) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }
  pop() {
    const ret = this.data[0];
    const last = this.data.pop();
    if (this.data.length) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        let l = 2 * i + 1,
          r = 2 * i + 2,
          m = i;
        if (l < this.data.length && this.compare(this.data[l], this.data[m]))
          m = l;
        if (r < this.data.length && this.compare(this.data[r], this.data[m]))
          m = r;
        if (m === i) break;
        [this.data[i], this.data[m]] = [this.data[m], this.data[i]];
        i = m;
      }
    }
    return ret;
  }
}

const out = [];

for (let tc = 0; tc < T; tc++) {
  const M = data[idx++];
  const maxHeap = new Heap((a, b) => a > b);
  const minHeap = new Heap((a, b) => a < b);
  const medians = [];

  for (let i = 0; i < M; i++) {
    const num = data[idx++];
    if (maxHeap.size() === minHeap.size()) {
      if (minHeap.size() && num > minHeap.peek()) {
        maxHeap.push(minHeap.pop());
        minHeap.push(num);
      } else {
        maxHeap.push(num);
      }
    } else {
      if (num < maxHeap.peek()) {
        minHeap.push(maxHeap.pop());
        maxHeap.push(num);
      } else {
        minHeap.push(num);
      }
    }
    if ((i & 1) === 0) {
      medians.push(maxHeap.peek());
    }
  }

  out.push(String(medians.length));
  let line = [];
  for (let v of medians) {
    line.push(v);
    if (line.length === 10) {
      out.push(line.join(" "));
      line = [];
    }
  }
  if (line.length) out.push(line.join(" "));
}

console.log(out.join("\n"));
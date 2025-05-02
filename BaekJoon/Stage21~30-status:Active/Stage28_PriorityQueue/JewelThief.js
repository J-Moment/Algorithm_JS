const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

const jewels = input
  .slice(1, N + 1)
  .map((line) => line.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

const bags = input
  .slice(N + 1, N + 1 + K)
  .map(Number)
  .sort((a, b) => a - b);

class MaxHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  push(val) {
    this.heap.push(val);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parent = (idx - 1) >> 1;
      if (this.heap[idx] > this.heap[parent]) {
        [this.heap[idx], this.heap[parent]] = [
          this.heap[parent],
          this.heap[idx],
        ];
        idx = parent;
      } else break;
    }
  }
  pop() {
    const h = this.heap;
    const top = h[0];
    const last = h.pop();
    if (h.length > 0) {
      h[0] = last;
      let idx = 0,
        len = h.length;
      while (true) {
        let left = 2 * idx + 1,
          right = 2 * idx + 2,
          largest = idx;
        if (left < len && h[left] > h[largest]) largest = left;
        if (right < len && h[right] > h[largest]) largest = right;
        if (largest !== idx) {
          [h[idx], h[largest]] = [h[largest], h[idx]];
          idx = largest;
        } else break;
      }
    }
    return top;
  }
}

let totalValue = 0;
const pq = new MaxHeap();
let j = 0;

for (let i = 0; i < K; i++) {
  const cap = bags[i];
  while (j < N && jewels[j][0] <= cap) {
    pq.push(jewels[j][1]);
    j++;
  }
  if (pq.size() > 0) {
    totalValue += pq.pop();
  }
}

console.log(totalValue);
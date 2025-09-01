class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  getMin() {
    return this.heap[0];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let idx = this.size() - 1;
    const last = this.heap[idx];

    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] <= last) break;
      this.heap[idx] = this.heap[parentIdx];
      idx = parentIdx;
    }
    this.heap[idx] = last;
  }

  bubbleDown() {
    let idx = 0;
    const length = this.size();
    const root = this.heap[0];

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let swap = null;

      if (left < length && this.heap[left] < root) {
        swap = left;
      }
      if (
        right < length &&
        this.heap[right] < (swap === null ? root : this.heap[left])
      ) {
        swap = right;
      }
      if (swap === null) break;
      this.heap[idx] = this.heap[swap];
      idx = swap;
    }
    this.heap[idx] = root;
  }
}

function solution(scoville, K) {
  const heap = new MinHeap();

  scoville.forEach((s) => heap.push(s));

  let count = 0;

  while (heap.getMin() < K) {
    if (heap.size() < 2) return -1;

    const min1 = heap.pop();
    const min2 = heap.pop();
    const newFood = min1 + min2 * 2;

    heap.push(newFood);
    count++;
  }

  return count;
}
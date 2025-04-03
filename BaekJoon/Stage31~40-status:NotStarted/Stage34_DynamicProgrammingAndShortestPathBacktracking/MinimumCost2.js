const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);
const graph = Array.from({ length: n + 1 }, () => []);
const INF = Infinity;

for (let i = 2; i < 2 + m; i++) {
  const [from, to, cost] = input[i].split(" ").map(Number);
  graph[from].push([to, cost]);
}

const [start, end] = input[2 + m].split(" ").map(Number);
const dist = Array(n + 1).fill(INF);
const from = Array(n + 1).fill(0);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent][0] <= value[0]) break;
      [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
      idx = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;
    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let smallest = idx;
      if (left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
      if (right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }
    return top;
  }

  size() {
    return this.heap.length;
  }
}

const heap = new MinHeap();
dist[start] = 0;
heap.push([0, start]);

while (heap.size()) {
  const [curCost, cur] = heap.pop();

  if (dist[cur] < curCost) continue;

  for (const [next, cost] of graph[cur]) {
    if (dist[next] > dist[cur] + cost) {
      dist[next] = dist[cur] + cost;
      from[next] = cur;
      heap.push([dist[next], next]);
    }
  }
}

const path = [];
let current = end;
while (current !== 0) {
  path.push(current);
  current = from[current];
}
path.reverse();

console.log(dist[end]);
console.log(path.length);
console.log(path.join(" "));
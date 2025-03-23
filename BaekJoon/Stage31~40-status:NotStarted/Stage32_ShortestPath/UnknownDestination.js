const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let idx = 0;
const T = Number(input[idx++]);
const INF = Infinity;

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[parent][0] <= this.heap[i][0]) break;
      [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
      i = parent;
    }
  }
  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      let left = i * 2 + 1;
      let right = i * 2 + 2;
      let smallest = i;
      if (
        left < this.heap.length &&
        this.heap[left][0] < this.heap[smallest][0]
      )
        smallest = left;
      if (
        right < this.heap.length &&
        this.heap[right][0] < this.heap[smallest][0]
      )
        smallest = right;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
    return min;
  }
  size() {
    return this.heap.length;
  }
}

const dijkstra = (start, n, graph) => {
  const dist = Array(n + 1).fill(INF);
  const heap = new MinHeap();
  dist[start] = 0;
  heap.push([0, start]);

  while (heap.size()) {
    const [cost, now] = heap.pop();
    if (dist[now] < cost) continue;
    for (const [next, nextCost] of graph[now]) {
      if (dist[next] > dist[now] + nextCost) {
        dist[next] = dist[now] + nextCost;
        heap.push([dist[next], next]);
      }
    }
  }
  return dist;
};

let output = "";
for (let t = 0; t < T; t++) {
  const [n, m, targetNum] = input[idx++].split(" ").map(Number);
  const [s, g, h] = input[idx++].split(" ").map(Number);
  const graph = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < m; i++) {
    const [a, b, d] = input[idx++].split(" ").map(Number);
    graph[a].push([b, d]);
    graph[b].push([a, d]);
  }

  const targets = input.slice(idx, idx + targetNum).map(Number);
  idx += targetNum;

  const distS = dijkstra(s, n, graph);
  const distG = dijkstra(g, n, graph);
  const distH = dijkstra(h, n, graph);

  const result = [];
  targets.sort((a, b) => a - b);
  for (const x of targets) {
    const path1 = distS[g] + distG[h] + distH[x];
    const path2 = distS[h] + distH[g] + distG[x];
    if (distS[x] !== INF && (distS[x] === path1 || distS[x] === path2)) {
      result.push(x);
    }
  }
  output += result.join(" ") + "\n";
}

console.log(output.trim());
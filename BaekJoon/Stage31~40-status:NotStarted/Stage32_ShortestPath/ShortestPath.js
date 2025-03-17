const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);
const start = Number(input[1]);

const graph = Array.from({ length: V + 1 }, () => []);
const INF = Infinity;
const dist = Array(V + 1).fill(INF);

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        let currentIndex = this.heap.length - 1;
        while (currentIndex > 0) {
            let parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex][0] <= value[0]) break;
            [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
            currentIndex = parentIndex;
        }
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        let currentIndex = 0;
        while (true) {
            let leftIndex = 2 * currentIndex + 1;
            let rightIndex = 2 * currentIndex + 2;
            let minIndex = currentIndex;

            if (leftIndex < this.heap.length && this.heap[leftIndex][0] < this.heap[minIndex][0]) {
                minIndex = leftIndex;
            }
            if (rightIndex < this.heap.length && this.heap[rightIndex][0] < this.heap[minIndex][0]) {
                minIndex = rightIndex;
            }
            if (minIndex === currentIndex) break;
            [this.heap[currentIndex], this.heap[minIndex]] = [this.heap[minIndex], this.heap[currentIndex]];
            currentIndex = minIndex;
        }
        return min;
    }

    size() {
        return this.heap.length;
    }
}

for (let i = 2; i < 2 + E; i++) {
    const [u, v, w] = input[i].split(" ").map(Number);
    graph[u].push([v, w]);
}

const dijkstra = (start) => {
    const pq = new MinHeap();
    dist[start] = 0;
    pq.push([0, start]);

    while (pq.size() > 0) {
        const [currentDist, node] = pq.pop();

        if (currentDist > dist[node]) continue;

        for (const [nextNode, weight] of graph[node]) {
            const cost = currentDist + weight;

            if (cost < dist[nextNode]) {
                dist[nextNode] = cost;
                pq.push([cost, nextNode]);
            }
        }
    }
};

dijkstra(start);

console.log(dist.slice(1).map(d => (d === INF ? "INF" : d)).join("\n"));
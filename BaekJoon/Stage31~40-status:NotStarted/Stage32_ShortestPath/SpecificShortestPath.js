const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, E] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const INF = Infinity;

for (let i = 1; i <= E; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
}

const [v1, v2] = input[E + 1].split(" ").map(Number);

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[parent][0] <= value[0]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        let index = 0;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let minIndex = index;

            if (left < this.heap.length && this.heap[left][0] < this.heap[minIndex][0]) {
                minIndex = left;
            }
            if (right < this.heap.length && this.heap[right][0] < this.heap[minIndex][0]) {
                minIndex = right;
            }
            if (minIndex === index) break;
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
        return min;
    }

    size() {
        return this.heap.length;
    }
}

const dijkstra = (start) => {
    const dist = Array(N + 1).fill(INF);
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
    return dist;
};

const distFrom1 = dijkstra(1);
const distFromV1 = dijkstra(v1);
const distFromV2 = dijkstra(v2);

const route1 = distFrom1[v1] + distFromV1[v2] + distFromV2[N];

const route2 = distFrom1[v2] + distFromV2[v1] + distFromV1[N];

const result = Math.min(route1, route2);
console.log(result >= INF ? -1 : result);
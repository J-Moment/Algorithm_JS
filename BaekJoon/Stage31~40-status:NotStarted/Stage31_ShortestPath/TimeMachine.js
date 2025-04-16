const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const edges = input.slice(1).map(line => line.split(" ").map(Number));
const INF = Infinity;
const dist = Array(N + 1).fill(INF);

dist[1] = 0;

for (let i = 1; i <= N - 1; i++) {
    for (const [from, to, cost] of edges) {
        if (dist[from] !== INF && dist[to] > dist[from] + cost) {
            dist[to] = dist[from] + cost;
        }
    }
}

let hasCycle = false;
for (const [from, to, cost] of edges) {
    if (dist[from] !== INF && dist[to] > dist[from] + cost) {
        hasCycle = true;
        break;
    }
}

if (hasCycle) {
    console.log(-1);
} else {
    for (let i = 2; i <= N; i++) {
        console.log(dist[i] === INF ? -1 : dist[i]);
    }
}
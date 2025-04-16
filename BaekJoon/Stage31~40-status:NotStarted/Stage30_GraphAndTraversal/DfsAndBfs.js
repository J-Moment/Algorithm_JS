const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const [N, M, V] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
    const [u, v] = input[i].split(' ').map(Number);
    graph[u].push(v);
    graph[v].push(u);
}

for (let i = 1; i <= N; i++) {
    graph[i].sort((a, b) => a - b);
}

// DFS
const visitedDFS = Array(N + 1).fill(false);
let resultDFS = [];

function dfs(node) {
    visitedDFS[node] = true;
    resultDFS.push(node);

    for (const next of graph[node]) {
        if (!visitedDFS[next]) {
            dfs(next);
        }
    }
}

// BFS
const visitedBFS = Array(N + 1).fill(false);
let resultBFS = [];

function bfs(start) {
    const queue = [start];
    visitedBFS[start] = true;

    while (queue.length > 0) {
        const node = queue.shift();
        resultBFS.push(node);

        for (const next of graph[node]) {
            if (!visitedBFS[next]) {
                visitedBFS[next] = true;
                queue.push(next);
            }
        }
    }
}

dfs(V);
bfs(V);

console.log(resultDFS.join(' '));
console.log(resultBFS.join(' '));
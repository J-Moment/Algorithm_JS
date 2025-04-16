const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const [N, M, R] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array(N + 1).fill(0);
let order = 1;

for (let i = 1; i <= M; i++) {
    const [u, v] = input[i].split(' ').map(Number);
    graph[u].push(v);
    graph[v].push(u);
}

for (let i = 1; i <= N; i++) {
    graph[i].sort((a, b) => a - b);
}

function bfs(start) {
    const queue = [start];
    visited[start] = order++;

    while (queue.length > 0) {
        const node = queue.shift();

        for (const next of graph[node]) {
            if (!visited[next]) {
                visited[next] = order++;
                queue.push(next);
            }
        }
    }
}

bfs(R);

console.log(visited.slice(1).join('\n'));
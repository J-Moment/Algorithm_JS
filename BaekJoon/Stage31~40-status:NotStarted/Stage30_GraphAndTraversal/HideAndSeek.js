const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const [N, K] = input[0].split(" ").map(Number);
const MAX = 100000;
const visited = Array(MAX + 1).fill(false);

function bfs(start) {
    const queue = [[start, 0]];
    visited[start] = true;

    while (queue.length > 0) {
        const [pos, count] = queue.shift();

        if (pos === K) return count;

        for (const next of [pos - 1, pos + 1, pos * 2]) {
            if (next >= 0 && next <= MAX && !visited[next]) {
                visited[next] = true;
                queue.push([next, count + 1]);
            }
        }
    }
}

console.log(bfs(N));
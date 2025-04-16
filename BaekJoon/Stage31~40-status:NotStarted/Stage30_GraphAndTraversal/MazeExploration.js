const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const maze = input.slice(1).map(line => line.split('').map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs() {
    const queue = [[0, 0]];
    const visited = Array.from({ length: N }, () => Array(M).fill(false));
    visited[0][0] = true;

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
                if (!visited[nx][ny] && maze[nx][ny] === 1) {
                    visited[nx][ny] = true;
                    maze[nx][ny] = maze[x][y] + 1;
                    queue.push([nx, ny]);
                }
            }
        }
    }

    return maze[N - 1][M - 1];
}

console.log(bfs());
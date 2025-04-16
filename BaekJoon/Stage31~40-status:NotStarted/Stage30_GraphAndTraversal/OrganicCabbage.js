const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const T = Number(input[0]);
let index = 1;
const results = [];

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function dfs(x, y, field, visited, M, N) {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && ny >= 0 && nx < M && ny < N) {
            if (!visited[nx][ny] && field[nx][ny] === 1) {
                dfs(nx, ny, field, visited, M, N);
            }
        }
    }
}

for (let t = 0; t < T; t++) {
    const [M, N, K] = input[index].split(' ').map(Number);
    const field = Array.from({ length: M }, () => Array(N).fill(0));
    const visited = Array.from({ length: M }, () => Array(N).fill(false));

    for (let i = 1; i <= K; i++) {
        const [x, y] = input[index + i].split(' ').map(Number);
        field[x][y] = 1;
    }

    let wormCount = 0;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (field[i][j] === 1 && !visited[i][j]) {
                dfs(i, j, field, visited, M, N);
                wormCount++;
            }
        }
    }

    results.push(wormCount);
    index += K + 1;
}

console.log(results.join('\n'));
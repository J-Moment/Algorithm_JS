const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const N = Number(input[0]);
const map = input.slice(1).map(line => line.split('').map(Number));
const visited = Array.from({ length: N }, () => Array(N).fill(false));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let complexCount = 0;
const houseCounts = [];

function dfs(x, y) {
    let count = 1;
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
            if (!visited[nx][ny] && map[nx][ny] === 1) {
                count += dfs(nx, ny);
            }
        }
    }
    return count;
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 1 && !visited[i][j]) {
            complexCount++;
            houseCounts.push(dfs(i, j));
        }
    }
}

houseCounts.sort((a, b) => a - b);
console.log(complexCount);
console.log(houseCounts.join('\n'));
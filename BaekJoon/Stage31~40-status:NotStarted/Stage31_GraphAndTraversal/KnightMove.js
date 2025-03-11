const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const dx = [-2, -2, -1, -1, 1, 1, 2, 2];
const dy = [-1, 1, -2, 2, -2, 2, -1, 1];

const T = Number(input[0]);
let index = 1;

function bfs(l, startX, startY, targetX, targetY) {
    if (startX === targetX && startY === targetY) return 0;

    const queue = [[startX, startY, 0]];
    const visited = Array.from({ length: l }, () => Array(l).fill(false));
    visited[startX][startY] = true;

    while (queue.length > 0) {
        const [x, y, count] = queue.shift();

        for (let i = 0; i < 8; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx >= 0 && ny >= 0 && nx < l && ny < l && !visited[nx][ny]) {
                if (nx === targetX && ny === targetY) return count + 1;

                visited[nx][ny] = true;
                queue.push([nx, ny, count + 1]);
            }
        }
    }
}

let result = [];
for (let t = 0; t < T; t++) {
    const l = Number(input[index]);
    const [startX, startY] = input[index + 1].split(' ').map(Number);
    const [targetX, targetY] = input[index + 2].split(' ').map(Number);
    index += 3;

    result.push(bfs(l, startX, startY, targetX, targetY));
}

console.log(result.join('\n'));
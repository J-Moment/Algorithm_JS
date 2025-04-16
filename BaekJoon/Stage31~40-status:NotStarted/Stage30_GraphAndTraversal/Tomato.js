const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const box = input.slice(1).map(line => line.split(' ').map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let queue = [];
let unripeCount = 0;
let days = 0;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (box[i][j] === 1) queue.push([i, j, 0]);
        if (box[i][j] === 0) unripeCount++;
    }
}

let front = 0;
while (front < queue.length) {
    const [x, y, day] = queue[front++];
    days = day;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && ny >= 0 && nx < N && ny < M && box[nx][ny] === 0) {
            box[nx][ny] = 1;
            unripeCount--;
            queue.push([nx, ny, day + 1]);
        }
    }
}

console.log(unripeCount === 0 ? days : -1);
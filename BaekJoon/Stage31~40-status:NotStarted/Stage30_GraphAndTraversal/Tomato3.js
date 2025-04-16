const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [M, N, H] = input[0].split(" ").map(Number);
const box = [];
let queue = [];
let unripeCount = 0;
let days = 0;

const dx = [-1, 1, 0, 0, 0, 0];
const dy = [0, 0, -1, 1, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

let index = 1;
for (let h = 0; h < H; h++) {
  let layer = [];
  for (let n = 0; n < N; n++) {
    let row = input[index++].split(" ").map(Number);
    layer.push(row);

    for (let m = 0; m < M; m++) {
      if (row[m] === 1) queue.push([h, n, m, 0]);
      if (row[m] === 0) unripeCount++;
    }
  }
  box.push(layer);
}

let front = 0;
while (front < queue.length) {
  const [z, x, y, day] = queue[front++];
  days = day;

  for (let i = 0; i < 6; i++) {
    const nz = z + dz[i];
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (
      nz >= 0 &&
      nx >= 0 &&
      ny >= 0 &&
      nz < H &&
      nx < N &&
      ny < M &&
      box[nz][nx][ny] === 0
    ) {
      box[nz][nx][ny] = 1;
      unripeCount--;
      queue.push([nz, nx, ny, day + 1]);
    }
  }
}

console.log(unripeCount === 0 ? days : -1);
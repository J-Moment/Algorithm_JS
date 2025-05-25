const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs
  .readFileSync(filepath)
  .toString()
  .trim()
  .split(/\s+/)
  .map(Number);
let ptr = 0;
const K = input[ptr++];
const size = 1 << K;
const holeX = input[ptr++] - 1;
const holeY = input[ptr++] - 1;

const board = Array.from({ length: size }, () => Array(size).fill(0));

board[holeY][holeX] = -1;

let tileId = 1;

function tile(sr, sc, hr, hc, n) {
  if (n === 2) {
    for (let dy = 0; dy < 2; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        const y = sr + dy,
          x = sc + dx;
        if (board[y][x] === 0) {
          board[y][x] = tileId;
        }
      }
    }
    tileId++;
    return;
  }
  const half = n >> 1;
  const cx = sc + half,
    cy = sr + half;
  [];
  let quad;
  if (hr < cy) {
    quad = hc < cx ? 0 : 1;
  } else {
    quad = hc < cx ? 2 : 3;
  }
  const id = tileId++;
  if (quad !== 0) board[cy - 1][cx - 1] = id;
  if (quad !== 1) board[cy - 1][cx] = id;
  if (quad !== 2) board[cy][cx - 1] = id;
  if (quad !== 3) board[cy][cx] = id;

  tile(sr, sc, quad === 0 ? hr : cy - 1, quad === 0 ? hc : cx - 1, half);
  tile(sr, cx, quad === 1 ? hr : cy - 1, quad === 1 ? hc : cx, half);
  tile(cy, sc, quad === 2 ? hr : cy, quad === 2 ? hc : cx - 1, half);
  tile(cy, cx, quad === 3 ? hr : cy, quad === 3 ? hc : cx, half);
}

tile(0, 0, holeY, holeX, size);

let out = "";
for (let r = size - 1; r >= 0; r--) {
  out += board[r].join(" ") + "\n";
}
console.log(out);
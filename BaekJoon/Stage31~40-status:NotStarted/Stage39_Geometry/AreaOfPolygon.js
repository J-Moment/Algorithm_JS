const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = parseInt(input[0], 10);

const points = input.slice(1).map(line => line.split(' ').map(Number));

let twiceArea = 0;
for (let i = 0; i < N; i++) {
  const [x1, y1] = points[i];
  const [x2, y2] = points[(i + 1) % N];
  twiceArea += x1 * y2 - x2 * y1;
}

const area = Math.abs(twiceArea) / 2;

console.log(area.toFixed(1));
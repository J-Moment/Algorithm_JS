const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [[x1, y1], [x2, y2], [x3, y3]] = input.map(line => line.split(" ").map(Number));

const dy1 = y2 - y1, dx1 = x2 - x1;
const dy2 = y3 - y2, dx2 = x3 - x2;

const left  = dy2 * dx1;
const right = dy1 * dx2;

if (left > right) {
  console.log(1);
} else if (left === right) {
  console.log(0);
} else {
  console.log(-1);
}
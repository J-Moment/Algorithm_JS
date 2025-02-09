const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
let lines = [];
for (let i = 1 ; i <= N ; i++) {
    lines.push(Number(input[i]))
}
lines.sort((a, b) => a - b);

let max = Math.max(...lines);
let min = 1;

while (min <= max) {
  let mid = Math.floor((min + max) / 2);

  let line = lines.map((line) => Math.floor(line / mid)).reduce((acc, cur) => (acc += cur), 0);

  if (line >= K) {
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}

console.log(max);
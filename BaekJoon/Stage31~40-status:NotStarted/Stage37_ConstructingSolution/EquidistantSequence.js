const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");
let n = Number(input[0]);

let result = [];
let big = Math.floor(n / 2) + 1;
let small = 1;

for (let i = 0; i < n; i++) {
  if (i % 2 === 0) {
    result.push(big++);
  } else {
    result.push(small++);
  }
}

console.log(result.join(" "));
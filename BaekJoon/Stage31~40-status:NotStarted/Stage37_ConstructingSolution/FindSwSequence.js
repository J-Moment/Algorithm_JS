const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);

let result = [1];
let current = 1;
let sign = 1;

for (let i = N - 1; i >= 1; i--) {
  current += sign * i;
  result.push(current);
  sign *= -1;
}

console.log(result.join(" "));
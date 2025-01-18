const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = +input[0];

let targetNum = 0;
let tmp = 0;

let numerator = 0;
let denominator = 0;

while (targetNum < N) {
  tmp++;
  targetNum = targetNum + tmp;
}

if (tmp % 2 === 0) {
  numerator = tmp - (targetNum - N);
  denominator = tmp + 1 - numerator;
} else {
  denominator = tmp - (targetNum - N);
  numerator = tmp + 1 - denominator;
}

console.log(`${numerator}/${denominator}`);
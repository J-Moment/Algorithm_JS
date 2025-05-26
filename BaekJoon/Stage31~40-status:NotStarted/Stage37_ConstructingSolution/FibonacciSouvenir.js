const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim();
const N = parseInt(input, 10);

const A = [];
const B = [];

for (let i = N; i > 2; i -= 3) {
  A.push(i);
  B.push(i - 1, i - 2);
}

if (N % 3 === 2) {
  A.push(1);
  B.push(2);
}

A.sort((a, b) => a - b);
B.sort((a, b) => a - b);

console.log(A.length);
console.log(A.join(' '));
console.log(B.length);
console.log(B.join(' '));
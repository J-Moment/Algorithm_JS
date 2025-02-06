const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let A = input[1].split(" ").map(Number);
let B = input[2].split(" ").map(Number);
let M = input[3];
let C = input[4].split(" ").map(Number);

let ans = [];

// 0이면 큐, 1이면 스택
for (let i = 0; i < N; i++) {
  if (A[i] === 0) {
    ans.push(B[i]);
  }
}

console.log(ans.reverse().concat(C).slice(0, M).map(String).join(" "));
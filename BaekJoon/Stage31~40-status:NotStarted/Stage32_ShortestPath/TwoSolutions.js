const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number).sort((a, b) => a - b);

let left = 0;
let right = N - 1;
let min = Infinity;
let answer = [];

while (left < right) {
  const sum = arr[left] + arr[right];

  if (Math.abs(sum) < min) {
    min = Math.abs(sum);
    answer = [arr[left], arr[right]];
  }

  if (sum < 0) {
    left++;
  } else {
    right--;
  }
}

console.log(answer[0], answer[1]);
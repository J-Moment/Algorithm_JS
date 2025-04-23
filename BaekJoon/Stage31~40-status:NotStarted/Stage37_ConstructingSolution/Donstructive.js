const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);

let arr = Array(N);
let left = 0;
let right = N - 1;
let num = 1;

while (left <= right) {
  arr[left++] = num++;
  if (left <= right) arr[right--] = num++;
}

console.log(arr.join(" "));
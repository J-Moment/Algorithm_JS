const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, S] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let left = 0, right = 0, sum = 0;
let minLength = Infinity;

while (true) {
  if (sum >= S) {
    minLength = Math.min(minLength, right - left);
    sum -= arr[left++];
  } else if (right === N) {
    break;
  } else {
    sum += arr[right++];
  }
}

console.log(minLength === Infinity ? 0 : minLength);
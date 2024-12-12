const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = +input[0];
const li = input[1].split(' ').map(Number);

const increaseDP = new Array(N).fill(1);
const decreaseDP = new Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (li[j] < li[i]) {
      increaseDP[i] = Math.max(increaseDP[i], increaseDP[j] + 1);
    }
  }
}

for (let i = N - 1; i >= 0; i--) {
  for (let j = N - 1; j > i; j--) {
    if (li[j] < li[i]) {
      decreaseDP[i] = Math.max(decreaseDP[i], decreaseDP[j] + 1);
    }
  }
}

let maxLen = 0;
for (let i = 0; i < N; i++) {
    maxLen = Math.max(maxLen, increaseDP[i] + decreaseDP[i] - 1);
}

console.log(maxLen);
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let div = 2;
while (N > 1) {
  if (N % div === 0) {
    console.log(div);
    N /= div;
    div = 2;
  } else {
    div++;
  }
}
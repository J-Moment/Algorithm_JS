const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let M = Number(input[0]);
let N = Number(input[1]);

let li = [];

for (let i = M; i <= N; i++) {
  let cnt = 0;
  for (let j = 1; j <= i; j++) {
    if (i % j === 0) cnt++;
  }

  if (cnt === 2) li.push(i);
}
if (li.length > 0) {
  console.log(li.reduce((acc, cur) => acc + cur, 0));
  console.log(Math.min(...li));
} else console.log(-1);
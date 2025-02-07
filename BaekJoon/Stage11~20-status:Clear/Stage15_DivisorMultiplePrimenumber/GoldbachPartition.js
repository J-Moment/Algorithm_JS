const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let T = Number(input[0]);
let li = [];
for (let i = 1; i <= T; i++) {
  li.push(Number(input[i]));
}

let max = Math.max(...li);
let checkli = new Array(max + 1).fill(false);

for (let i = 2; i <= max; i++) {
  if (!checkli[i]) {
    for (let j = i * i; j <= max; j += i) {
      checkli[j] = true;
    }
  }
}
let result = [];

for (let item of li) {
  let count = 0;
  if (item === 4) count = 1;
  else {
    for (let i = 3; i <= item / 2; i += 2) {
      if (!checkli[i] && !checkli[item - i] && item - i != 1) {
        count++;
      }
    }
  }
  result.push(count);
}
console.log(result.join("\n"));
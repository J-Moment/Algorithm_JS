const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let idx = 0;
const T = Number(input[idx++]);

const result = [];

for (let t = 0; t < T; t++) {
  const [N, M] = input[idx++].split(" ").map(Number);

  for (let i = 0; i < M; i++) {
    idx++;
  }

  result.push(N - 1);
}

console.log(result.join("\n"));
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const T = Number(input[0]);
const results = [];

for (let t = 1; t <= T; t++) {
  const [A, B] = input[t].split(" ").map(Number);
  const visited = Array(10000).fill(false);
  const queue = [[A, ""]];
  visited[A] = true;

  while (queue.length) {
    const [num, ops] = queue.shift();

    if (num === B) {
      results.push(ops);
      break;
    }

    const D = (num * 2) % 10000;
    const S = num === 0 ? 9999 : num - 1;
    const L = (num % 1000) * 10 + Math.floor(num / 1000);
    const R = (num % 10) * 1000 + Math.floor(num / 10);

    for (const [next, op] of [
      [D, "D"],
      [S, "S"],
      [L, "L"],
      [R, "R"],
    ]) {
      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, ops + op]);
      }
    }
  }
}

console.log(results.join("\n"));
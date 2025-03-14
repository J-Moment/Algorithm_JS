const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = Array(101).fill(0);
const visited = Array(101).fill(false);

for (let i = 1; i <= N + M; i++) {
  const [from, to] = input[i].split(" ").map(Number);
  board[from] = to;
}

const queue = [[1, 0]];
visited[1] = true;

while (queue.length) {
  const [pos, count] = queue.shift();

  if (pos === 100) {
    console.log(count);
    break;
  }

  for (let dice = 1; dice <= 6; dice++) {
    let next = pos + dice;
    if (next > 100) continue;

    if (board[next]) next = board[next];
    if (!visited[next]) {
      visited[next] = true;
      queue.push([next, count + 1]);
    }
  }
}
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split("").map(Number));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

class Deque {
  constructor() {
    this.data = {};
    this.front = 0;
    this.rear = 0;
  }
  push(value) {
    this.data[this.rear++] = value;
  }
  shift() {
    if (this.front === this.rear) return null;
    const value = this.data[this.front];
    delete this.data[this.front++];
    return value;
  }
  isEmpty() {
    return this.front === this.rear;
  }
}

const bfs = () => {
  const queue = new Deque();
  queue.push([0, 0, 0, 1]);

  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [false, false])
  );

  visited[0][0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y, broken, dist] = queue.shift();

    if (x === N - 1 && y === M - 1) return dist;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
        if (map[nx][ny] === 0 && !visited[nx][ny][broken]) {
          visited[nx][ny][broken] = true;
          queue.push([nx, ny, broken, dist + 1]);
        }
        if (map[nx][ny] === 1 && broken === 0 && !visited[nx][ny][1]) {
          visited[nx][ny][1] = true;
          queue.push([nx, ny, 1, dist + 1]);
        }
      }
    }
  }

  return -1;
};

console.log(bfs());
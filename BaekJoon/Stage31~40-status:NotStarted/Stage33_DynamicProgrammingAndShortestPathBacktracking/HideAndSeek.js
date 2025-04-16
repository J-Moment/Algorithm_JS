const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

const MAX = 100001;
const visited = Array(MAX).fill(false);
const from = Array(MAX).fill(-1);
const dist = Array(MAX).fill(0);

function bfs(start) {
  const queue = [start];
  visited[start] = true;

  while (queue.length) {
    const cur = queue.shift();

    if (cur === K) break;

    for (const next of [cur - 1, cur + 1, cur * 2]) {
      if (next >= 0 && next < MAX && !visited[next]) {
        visited[next] = true;
        from[next] = cur;
        dist[next] = dist[cur] + 1;
        queue.push(next);
      }
    }
  }
}

bfs(N);

console.log(dist[K]);

const path = [];
let cur = K;
while (cur !== -1) {
  path.push(cur);
  cur = from[cur];
}
console.log(path.reverse().join(" "));
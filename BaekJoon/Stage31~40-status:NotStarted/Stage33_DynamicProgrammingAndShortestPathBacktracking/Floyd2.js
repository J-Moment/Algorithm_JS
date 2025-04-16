const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const m = Number(input[1]);

const INF = Infinity;
const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(INF));
const next = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) dist[i][i] = 0;

for (let i = 2; i < 2 + m; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  if (dist[a][b] > c) {
    dist[a][b] = c;
    next[a][b] = b;
  }
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (dist[i][k] + dist[k][j] < dist[i][j]) {
        dist[i][j] = dist[i][k] + dist[k][j];
        next[i][j] = next[i][k];
      }
    }
  }
}

let result = "";
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    result += (dist[i][j] === INF ? "0" : dist[i][j]) + " ";
  }
  result += "\n";
}

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (dist[i][j] === 0 || dist[i][j] === INF) {
      result += "0\n";
    } else {
      const path = [];
      let cur = i;
      while (cur !== j) {
        path.push(cur);
        cur = next[cur][j];
      }
      path.push(j);
      result += path.length + " " + path.join(" ") + "\n";
    }
  }
}

console.log(result.trim());
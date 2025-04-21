const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(" ").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
let islandNum = 1;

function markIsland(x, y, id) {
  const queue = [[x, y]];
  map[x][y] = id;

  while (queue.length) {
    const [cx, cy] = queue.shift();
    for (let d = 0; d < 4; d++) {
      const nx = cx + dx[d];
      const ny = cy + dy[d];
      if (nx >= 0 && ny >= 0 && nx < N && ny < M && map[nx][ny] === 1) {
        map[nx][ny] = id;
        queue.push([nx, ny]);
      }
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 1) {
      islandNum++;
      markIsland(i, j, islandNum);
    }
  }
}

const edges = [];

function findBridges(x, y, islandId) {
  for (let d = 0; d < 4; d++) {
    let len = 0;
    let nx = x + dx[d];
    let ny = y + dy[d];

    while (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      if (map[nx][ny] === islandId) break; // 자기 섬이면 끊음
      if (map[nx][ny] !== 0) {
        if (len >= 2) {
          edges.push([len, islandId, map[nx][ny]]);
        }
        break;
      }
      nx += dx[d];
      ny += dy[d];
      len++;
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] > 1) {
      findBridges(i, j, map[i][j]);
    }
  }
}

edges.sort((a, b) => a[0] - b[0]);
const parent = Array.from({ length: islandNum + 1 }, (_, i) => i);

function find(x) {
  if (x !== parent[x]) parent[x] = find(parent[x]);
  return parent[x];
}

function union(a, b) {
  const rootA = find(a);
  const rootB = find(b);
  if (rootA === rootB) return false;
  parent[rootB] = rootA;
  return true;
}

let total = 0;
let count = 0;

for (const [cost, a, b] of edges) {
  if (union(a, b)) {
    total += cost;
    count++;
  }
}

if (count === islandNum - 2) {
  console.log(total);
} else {
  console.log(-1);
}
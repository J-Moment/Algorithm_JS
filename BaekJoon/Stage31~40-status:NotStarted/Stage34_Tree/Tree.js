const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let idx = 0;
let caseNum = 1;

while (true) {
  const [n, m] = input[idx++].split(" ").map(Number);
  if (n === 0 && m === 0) break;

  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = Array(n + 1).fill(false);

  for (let i = 0; i < m; i++) {
    const [a, b] = input[idx++].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  let treeCount = 0;

  function dfs(cur, parent) {
    visited[cur] = true;
    for (const next of graph[cur]) {
      if (!visited[next]) {
        if (!dfs(next, cur)) return false;
      } else if (next !== parent) {
        return false;
      }
    }
    return true;
  }

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      if (dfs(i, 0)) treeCount++;
    }
  }

  if (treeCount === 0) {
    console.log(`Case ${caseNum}: No trees.`);
  } else if (treeCount === 1) {
    console.log(`Case ${caseNum}: There is one tree.`);
  } else {
    console.log(`Case ${caseNum}: A forest of ${treeCount} trees.`);
  }

  caseNum++;
}
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath, "utf8").trim().split("\n");

const N = parseInt(input[0], 10);
const root = {};

for (let i = 1; i <= N; i++) {
  const parts = input[i].split(" ");
  const k = parseInt(parts[0], 10);
  let node = root;
  for (let j = 1; j <= k; j++) {
    const name = parts[j];
    if (!node[name]) {
      node[name] = {};
    }
    node = node[name];
  }
}

function dfs(node, depth) {
  const keys = Object.keys(node).sort();
  for (const key of keys) {
    console.log("--".repeat(depth) + key);
    dfs(node[key], depth + 1);
  }
}

dfs(root, 0);
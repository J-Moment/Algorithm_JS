const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);

let ans = new Array(M);

const dfs = (idx, depth) => {
  if (depth === M) {
    console.log(ans.join(" "));
    return;
  }

  for (let i = idx; i <= N; i++) {
    ans[depth] = i;
    dfs(i, depth + 1);
  }
};

dfs(1, 0);
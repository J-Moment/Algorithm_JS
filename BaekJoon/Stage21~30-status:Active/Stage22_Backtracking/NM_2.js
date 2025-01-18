const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);

let ans = new Array(M);
let visit = new Array(N).fill(false);

const dfs = (idx, depth) => {
  if (depth === M) {
    console.log(ans.join(" "));
    return;
  }

  for (let i = idx; i <= N; i++) {
    if (!visit[i]) {
      ans[depth] = i;
      visit[i] = true;
      dfs(i + 1, depth + 1);
      visit[i] = false;
    }
  }
};

dfs(1, 0);
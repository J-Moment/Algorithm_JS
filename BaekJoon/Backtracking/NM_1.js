const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);

let ans = new Array(M);
let visit = new Array(N).fill(false);

const dfs = (N, M, depth) => {
  if (depth === M) {
    console.log(ans.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visit[i]) {
      visit[i] = true;
      ans[depth] = i + 1;
      dfs(N, M, depth + 1);
      visit[i] = false;
    }
  }
};

dfs(N, M, 0);
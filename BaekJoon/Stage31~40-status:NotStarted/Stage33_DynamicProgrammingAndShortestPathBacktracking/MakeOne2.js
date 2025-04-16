const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);

const dp = Array(N + 1).fill(0);
const from = Array(N + 1).fill(0);

for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 1] + 1;
  from[i] = i - 1;

  if (i % 2 === 0 && dp[i] > dp[i / 2] + 1) {
    dp[i] = dp[i / 2] + 1;
    from[i] = i / 2;
  }

  if (i % 3 === 0 && dp[i] > dp[i / 3] + 1) {
    dp[i] = dp[i / 3] + 1;
    from[i] = i / 3;
  }
}

console.log(dp[N]);

let path = [N];
while (path[path.length - 1] !== 1) {
  path.push(from[path[path.length - 1]]);
}
console.log(path.join(' '));
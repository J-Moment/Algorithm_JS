const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = +input[0];

li = [];
for (let i = 1; i <= N; i++) {
  li.push(input[i].split(" ").map(Number));
}
li.sort((a, b) => a[0] - b[0]);

let dp = Array.from({ length: N }).fill(1);

for (let i = 1; i < N; i++) {
  count = 0;
  for (let j = 0; j < i; j++) {
    if (li[i][1] > li[j][1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

let answer = N - Math.max(...dp);
console.log(answer);
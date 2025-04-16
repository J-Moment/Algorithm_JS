const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const str1 = input[0];
const str2 = input[1];

const n = str1.length;
const m = str2.length;

const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    if (str1[i - 1] === str2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp[n][m]);

let i = n;
let j = m;
let result = [];

while (i > 0 && j > 0) {
  if (str1[i - 1] === str2[j - 1]) {
    result.push(str1[i - 1]);
    i--;
    j--;
  } else {
    if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
}

if (result.length > 0) {
  console.log(result.reverse().join(''));
}
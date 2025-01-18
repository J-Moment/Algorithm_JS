const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

const N = input[0];
const li = [0];
for(let i = 1 ; i <= N ; i++){
    li.push(+input[i]);
}
const dp = new Array(N + 1);

dp[1] = li[1];
dp[2] = dp[1] + li[2];
dp[3] = Math.max(li[1], li[2]) + li[3];
for (let i = 4; i <= N; i++) {
  dp[i] = Math.max(dp[i - 3] + li[i - 1] + li[i], dp[i - 2] + li[i]);
}

console.log(dp[N]);
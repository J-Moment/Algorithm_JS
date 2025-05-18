const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split(/\s+/);


const [N, K] = input.map(Number);

const MOD = 1000000003;

if (K === 1) {
  console.log(N);
  process.exit(0);
}
if (K > Math.floor(N / 2)) {
  console.log(0);
  process.exit(0);
}

const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

for (let i = 0; i <= N; i++) {
  dp[i][0] = 1;
}
if (N >= 1) dp[1][1] = 1;
if (N >= 2) dp[2][1] = 2;

for (let i = 3; i <= N; i++) {
  for (let j = 1; j <= K; j++) {
    dp[i][j] = (dp[i-1][j] + dp[i-2][j-1]) % MOD;
  }
}

const result = (dp[N-1][K] + dp[N-3][K-1]) % MOD;
console.log(result);
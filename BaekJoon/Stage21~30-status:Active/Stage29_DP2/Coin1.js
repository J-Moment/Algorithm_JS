const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");


let [N, K] = input[0].split(" ").map(Number);
let coins = [];
for(let i = 1 ; i <= N ; i++){
    coins.push(Number(input[i]));
}

let dp = Array(K + 1).fill(0);
dp[0] = 1;

for (const coin of coins) {
    for (let i = coin; i <= K; i++) {
        dp[i] += dp[i - coin];
    }
}

console.log(dp[K]);
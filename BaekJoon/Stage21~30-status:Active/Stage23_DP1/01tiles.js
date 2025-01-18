const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

let N = +input[0]
let memo = []
memo[0] = 1;
memo[1] = 2;
for(let i = 2 ; i < N ; i++) {
    memo[i] = (memo[i-2] + memo[i-1])%15746
}
console.log(memo[N-1])
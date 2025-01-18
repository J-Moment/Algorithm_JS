const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let firstSequence = input[0];
let secondSequence = input[1];

let N = firstSequence.length;
let M = secondSequence.length;

let dp = Array.from({length : N+1}, () => Array(N+1).fill(0));

for(let i = 0 ; i <= N ; i++) {
    for(let j = 0 ; j <= M ; j++) {
        if(i === 0 || j === 0) {
            dp[i][j] = 0;
        }
        else if (firstSequence[i-1] === secondSequence[j-1]) {
            dp[i][j] = dp[i-1][j-1] + 1;
        }
        else {
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
}

console.log((dp[N][M]));
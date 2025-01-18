let fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

let N = +input[0];
const dp = [];

//초기화
for(let i = 1 ; i <= N; i++){
    dp.push(input[i].split(' ').map(Number));
}

//최대값 구하기
for(let i = 1; i < N; i++){
    for(let j = 0 ; j < dp[i].length; j++) {
        if (j === 0) dp[i][j] += dp[i - 1][j]
        else if (j === dp[i].length - 1) dp[i][j] += dp[i - 1][j - 1];
        else dp[i][j] += Math.max(dp[i - 1][j - 1], dp[i - 1][j])
    }
}

const ans = Math.max(...dp[N - 1])
console.log(ans)
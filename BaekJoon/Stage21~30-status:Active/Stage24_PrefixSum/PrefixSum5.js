let fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

let [N, M] = input[0].split(" ").map(Number);
let matrix = [];
for(let i = 1 ; i <= N ; i++){
    matrix.push(input[i].split(" ").map(Number));
}

let dp = Array.from(Array(N), () => Array(N).fill(0));

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        dp[i][j] = matrix[i][j];
        if (i > 0) dp[i][j] += dp[i - 1][j];
        if (j > 0) dp[i][j] += dp[i][j - 1];
        if (i > 0 && j > 0) dp[i][j] -= dp[i - 1][j - 1];
    }
}

let answer = "";
for (let k = N + 1; k < N + 1 + M; k++) {
    let [x1, y1, x2, y2] = input[k].split(" ").map(Number);
    x1--; y1--; x2--; y2--;

    let sum = dp[x2][y2];
    if (x1 > 0) sum -= dp[x1 - 1][y2];
    if (y1 > 0) sum -= dp[x2][y1 - 1];
    if (x1 > 0 && y1 > 0) sum += dp[x1 - 1][y1 - 1];

    answer += sum + "\n";
}

console.log(answer.trim());
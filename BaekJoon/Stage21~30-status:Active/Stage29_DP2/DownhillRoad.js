const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let [N, M] = input[0].split(" ").map(Number);
let li = [];

for(let i = 1 ; i <= N ; i++){
    li.push(input[i].split(" ").map(Number));
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
li
const dp = Array.from({ length: N }, () => Array(M).fill(-1));

function dfs(x, y) {
    if (x === N - 1 && y === M - 1) return 1;

    if (dp[x][y] !== -1) return dp[x][y];

    dp[x][y] = 0;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
            if (li[nx][ny] < li[x][y]) {
                dp[x][y] += dfs(nx, ny);
            }
        }
    }
    return dp[x][y];
}

console.log(dfs(0, 0));
let fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

let [N, M, K] = input[0].split(" ").map(Number);
let board = [];
for(let i = 1 ; i <= N ; i++){
    board.push(input[i].split(""));
}

const dpBlack = Array.from(Array(N + 1), () => Array(M + 1).fill(0));
const dpWhite = Array.from(Array(N + 1), () => Array(M + 1).fill(0));

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        const isBlack = (i + j) % 2 === 0;
        const isWhite = !isBlack;

        const blackExpected = isBlack ? "B" : "W";
        const whiteExpected = isWhite ? "B" : "W";

        const blackCost = board[i][j] !== blackExpected ? 1 : 0;
        const whiteCost = board[i][j] !== whiteExpected ? 1 : 0;

        dpBlack[i + 1][j + 1] = dpBlack[i][j + 1] + dpBlack[i + 1][j] - dpBlack[i][j] + blackCost;
        dpWhite[i + 1][j + 1] = dpWhite[i][j + 1] + dpWhite[i + 1][j] - dpWhite[i][j] + whiteCost;
    }
}

let minCost = Infinity;
for (let i = K; i <= N; i++) {
    for (let j = K; j <= M; j++) {
        const blackCount = dpBlack[i][j] - dpBlack[i - K][j] - dpBlack[i][j - K] + dpBlack[i - K][j - K];
        const whiteCount = dpWhite[i][j] - dpWhite[i - K][j] - dpWhite[i][j - K] + dpWhite[i - K][j - K];
        minCost = Math.min(minCost, blackCount, whiteCount);
    }
}

console.log(minCost);
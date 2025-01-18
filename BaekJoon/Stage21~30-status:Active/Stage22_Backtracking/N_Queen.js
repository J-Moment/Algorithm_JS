const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = +input[0];

let ans = 0;
const board = Array.from({length: N}, () => 0);

const check = (idx) => {
    for(let i = 0 ; i < idx; i++) {
        if(board[i] === board[idx] || Math.abs(idx - i) === Math.abs(board[idx] - board[i])) return false;
    }
    return true;
}

const NQueens = (idx) => {
    if(idx === N) {
        ans++;
        return;
    }
    else{
        for(let i = 0 ; i < N; i++){
            board[idx] = i;
            if(check(idx)){
                NQueens(idx+1);
            }
        }
    }
}

NQueens(0);
console.log(ans);
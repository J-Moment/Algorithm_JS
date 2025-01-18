const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(' ').map(Number);

let A = [];
for(let i = 1 ; i <= N ; i++){
    let li = input[i].split(' ').map(Number);
    A.push(li);
}

let B = [];

let K = Number(input[N+1].split(' ')[1]);
for(let i = 0 ; i < M ; i++){
    let li = input[N+2+i].split(' ').map(Number);
    B.push(li);
}

for(let i = 0 ; i < N ; i++){
    let row = [];
    for(let j = 0 ; j < K ; j++){
        let sum = 0;
        for(let k = 0 ; k < M ; k++){
            sum += A[i][k] * B[k][j];
        }
        row.push(sum);
    }
    console.log(row.join(" "));
}
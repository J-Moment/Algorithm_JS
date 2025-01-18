const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

let N = +input[0];
let tc = 0;
let li;

for(let i = 1 ; i <= N ; i++){
    li = [1, 1, 1, 2, 2];
    tc = +input[i]
    for (let j = 5 ; j < tc ; j++){
        li[j] = li[j-5] + li[j-4] + li[j-3];
    }
    console.log(li[tc-1])
}
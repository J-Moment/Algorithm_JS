const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let ans = new Set();
let cnt = 0;

for(let i = 1 ; i <= N ; i++){
    let word = input[i];
    if(word !== "ENTER") ans.add(input[i]);
    else{
        cnt += ans.size;
        ans.clear();
    }
}

console.log(ans.size + cnt);
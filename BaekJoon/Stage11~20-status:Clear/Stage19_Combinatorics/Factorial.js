const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let ans = 1;

for(let i = N ; i >= 1 ; i--){
    ans *= i;
}

console.log(ans);
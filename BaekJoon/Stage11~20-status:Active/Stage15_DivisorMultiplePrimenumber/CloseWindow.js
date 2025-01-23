const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = input[0];

let cnt = 0;
for(let i = 1; i*i <= N ; i++){
    cnt++;
}

console.log(cnt);
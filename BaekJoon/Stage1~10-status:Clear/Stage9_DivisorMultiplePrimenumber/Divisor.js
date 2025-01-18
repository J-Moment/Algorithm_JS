const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, K] = input[0].split(' ').map(Number);

let li = [];

for(let i = 1 ; i <= N ; i++) {
    if(N%i === 0) li.push(i);
}

console.log(li.length < K ? 0 : li[K-1]);
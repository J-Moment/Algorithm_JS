const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let S = input[0];
let ans = new Set();
for(let i = 0; i < S.length ; i++){
    for (let j = i; j < S.length; j++) {
        ans.add(S.substring(i, j + 1))
    }
}

console.log(ans.size);
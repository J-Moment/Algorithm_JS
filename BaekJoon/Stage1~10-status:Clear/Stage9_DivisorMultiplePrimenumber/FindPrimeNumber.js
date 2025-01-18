const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let li = input[1].split(' ').map(Number);
let ans = 0;

for(let i = 0 ; i < li.length ; i++){
    let cnt = 0;
    for(let j = 1 ; j <= li[i] ; j++){
        if(li[i] % j === 0) cnt++;
    }
    if(cnt === 2) ans++;
}

console.log(ans);
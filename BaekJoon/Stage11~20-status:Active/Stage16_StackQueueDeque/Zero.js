const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let K = Number(input[0]);

let stack = [];
for(let i = 1 ; i <= K ; i++){
    let num = Number(input[i]);
    if(num === 0){
        stack.pop();
    }
    else {
        stack.push(num);
    }
}

console.log(stack.reduce((acc, cur) => acc + cur, 0));
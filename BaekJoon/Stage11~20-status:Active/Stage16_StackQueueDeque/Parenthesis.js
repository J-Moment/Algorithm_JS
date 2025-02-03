const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
for(let i = 1 ; i <= N ; i++){
    let ans = "YES";
    let str = input[i];
    let stack = [];

    for(let j = 0 ; j < str.length ; j++){
        if(str[j] === "(") stack.push("(");
        else {
            if(stack[stack.length-1] === "(") stack.pop();
            else {
                ans = "NO";
                break;
            }
        }
    }
    if(stack.length !== 0) ans = "NO";
    console.log(ans);
}
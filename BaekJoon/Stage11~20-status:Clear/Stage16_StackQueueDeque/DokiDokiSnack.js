const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let queue = input[1].split(" ").map(Number);
let stack = [];
let cur = 1;
let ans = "Nice";

while(cur <= N){
    if(stack[stack.length-1] === cur){
        stack.pop();
        cur++;
    }
    else {
        if(queue.length === 0) {
            ans = "Sad";
            break;
        }
        else {
            let shiftPerson = queue.shift();
            if (shiftPerson === cur){
                cur++;
            }
            else {
                stack.push(shiftPerson);
            }
        }
    }
}

console.log(ans);
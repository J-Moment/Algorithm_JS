const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let A = Number(input[0]);
let B = Number(input[1]);
let C = Number(input[2]);

let ans = "";
if(A+B+C !== 180){
    ans = "Error";
}
else {
    if(A === 60 & B === 60) ans = "Equilateral";
    else if(A === B || B === C || A === C) ans = "Isosceles";
    else ans = "Scalene";
}

console.log(ans);
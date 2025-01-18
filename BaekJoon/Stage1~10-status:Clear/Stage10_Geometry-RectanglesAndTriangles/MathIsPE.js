const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);

let cnt = 0;

for(let i = N ; i > 0; i--) cnt++;

let circumference = cnt * 4;
let overlappingPart = (cnt - N)*2;

console.log(circumference - overlappingPart);
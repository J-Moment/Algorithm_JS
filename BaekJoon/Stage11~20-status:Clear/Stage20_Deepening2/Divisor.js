const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let cnt = Number(input[0]);

let divList = input[1].split(' ').sort((a,b)=>a-b);
let min = divList[0];
let max = divList[divList.length-1];

let result = divList.length >= 2 ? max * min : max*max;

console.log(result);
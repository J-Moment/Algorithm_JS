const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);

let li = [];

let xMax = Number.MIN_SAFE_INTEGER;
let yMax = Number.MIN_SAFE_INTEGER;
let xMin = Number.MAX_SAFE_INTEGER;
let yMin = Number.MAX_SAFE_INTEGER;
for(let i = 1 ; i <= N ; i++) {
    li.push(input[i].split(' ').map(Number));
}

for(let i = 0 ; i < N ; i++){
    if(li[i][0] > xMax) xMax = li[i][0];
    if(li[i][0] < xMin) xMin = li[i][0];
    if(li[i][1] > yMax) yMax = li[i][1];
    if(li[i][1] < yMin) yMin = li[i][1];
}

console.log(Math.abs((xMax-xMin) * (yMax-yMin)));
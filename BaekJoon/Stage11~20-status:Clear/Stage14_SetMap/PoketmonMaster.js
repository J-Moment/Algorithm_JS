const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(' ').map(Number);
let poketmonMap = new Map();

for(let i = 1 ; i <= N ; i++){
    poketmonMap.set(input[i], i);
    poketmonMap.set(`${i}`, input[i]);
}
let answer = [];

for(let i = N+1 ; i <= N+M ; i++){
    answer.push(poketmonMap.get(input[i]));
}

console.log(answer.join("\n"));
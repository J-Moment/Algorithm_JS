const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let cardList = new Set(input[1].split(" ").map(Number));
let M = Number(input[2]);
let checkCardList = input[3].split(" ").map(Number);

let ans = [];

for(let i = 0 ; i < M ; i++){
    if(cardList.has(checkCardList[i])) ans.push(1)
    else ans.push(0)
}

console.log(ans.join(' '));
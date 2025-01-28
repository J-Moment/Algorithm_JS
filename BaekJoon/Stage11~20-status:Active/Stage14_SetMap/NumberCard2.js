const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let cardList = input[1].split(" ").map(Number);
let M = Number(input[2]);
let checkCardList = input[3].split(" ").map(Number);

let cardMap = new Map();
for(let card of checkCardList) {
    cardMap.set(card, 0);
}

for (let card of cardList) {
    if(cardMap.has(card)){
        cardMap.set(card, cardMap.get(card)+1);
    }
}

let ans = [];
for (let card of checkCardList) {
    ans.push(cardMap.get(card));
}

console.log(ans.join(" "));
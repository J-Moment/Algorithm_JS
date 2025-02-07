const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [A, B] = input[0].split(" ").map(Number);

let Aset = new Set(input[1].split(" ").map(Number));
let Bset = new Set(input[2].split(" ").map(Number));

let [onlyA, onlyB] = [0, 0];

for(let item of Aset){
    if(!Bset.has(item)) onlyA++;
}
for(let item of Bset){
    if(!Aset.has(item)) onlyB++;
}

console.log(onlyA+onlyB);
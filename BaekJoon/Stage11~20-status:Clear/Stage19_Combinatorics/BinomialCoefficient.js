const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, K] = input[0].split(' ').map(Number);
let Nume = 1;
let Deno = 1;

for(let i = 1 ; i <= K ; i++){
    Nume *= (N-i+1);
    Deno *= (i);
}

console.log(Nume/Deno);
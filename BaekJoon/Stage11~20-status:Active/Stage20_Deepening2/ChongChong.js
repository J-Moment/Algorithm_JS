const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let infected = new Set();
infected.add("ChongChong");

for(let i = 1 ; i <= N ; i++){
    let [A, B] = input[i].split(" ");

    if(infected.has(A)) {
        infected.add(B);
    } else if(infected.has(B)) {
        infected.add(A);
    }
}

console.log(infected.size);
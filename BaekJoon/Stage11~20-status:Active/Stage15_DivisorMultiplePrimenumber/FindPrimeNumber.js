const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [M, N] = input[0].split(' ').map(Number);
const isPrimeNumber = (num) => {
    if(num < 2) return false;

    for(let i = 2 ; i <= Math.sqrt(num) ; i++){
        if(num % i === 0) return false;
    }
    return true;
}

for(let i = M ; i <= N ;i++){
    if(isPrimeNumber(i)) console.log(i);
}
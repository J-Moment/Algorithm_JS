const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);

const isPrimeNumber = (num) => {
    if(num < 2) return false;

    for(let i = 2 ; i <= Math.sqrt(num) ; i++){
        if(num % i === 0) return false;
    }
    return true;
}

for(let i = 1 ; i<=N ; i++){
    let num = Number(input[i]);

    while(!isPrimeNumber(num)){
        num++;
    }
    console.log(num);
}
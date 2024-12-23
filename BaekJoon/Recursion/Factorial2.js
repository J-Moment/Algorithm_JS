const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = +input[0];

const factorial = (n) => {
    if(n === 0) return 1;
    if(n === 1) return 1;
    return n*(factorial(n-1));
}

console.log(factorial(N));
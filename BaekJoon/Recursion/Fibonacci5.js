const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = +input[0];

const fibonacci = (num) => {
    if(num === 0) return 0;
    if(num === 1) return 1;

    return fibonacci(num-1) + fibonacci(num-2);
}

console.log(fibonacci(N));
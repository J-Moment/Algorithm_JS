const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let K = +input[0];
let ans = [];

let cnt = 0;

const hanoi = (n, a, b, c) => {
    if (n === 1) {
        ans.push(`${a} ${c}`);
    }
    else {
        hanoi(n - 1, a, c, b)
        ans.push(`${a} ${c}`);
        hanoi(n - 1, b, a, c)
    }
}
let sum = 1;
for(let i = 0 ; i < K-1 ; i++) {
    sum = sum * 2 + 1;
}
console.log(sum);

hanoi(K, 1, 2, 3)

console.log(ans.join("\n"));
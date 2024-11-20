const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let ans = 0
let li = input[0].split("-").map((str) =>
    str.split("+").map(Number).reduce((s, v) => s + v, 0)
);
ans = 2 * li[0] - li.reduce((s, v) => s + v, 0);

console.log(ans);
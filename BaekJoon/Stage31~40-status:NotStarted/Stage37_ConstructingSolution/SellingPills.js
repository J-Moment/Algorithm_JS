const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let N = fs.readFileSync(filepath).toString().trim().split("\n");

const B = Math.ceil(Math.sqrt(N));
const K = 2 * B;

const ans = Array(K);
for (let i = 0; i < B; i++) ans[i] = 1;
for (let i = B; i < K; i++) ans[i] = B;

console.log(K);
console.log(ans.join(" "));
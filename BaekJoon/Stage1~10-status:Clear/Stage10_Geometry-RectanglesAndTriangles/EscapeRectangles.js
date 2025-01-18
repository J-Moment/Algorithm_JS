const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [x, y, w, h] = input[0].split(' ').map(Number);

let min = Math.min(Math.abs(w-x), Math.abs(h-y), Math.abs(x), Math.abs(y));
console.log(min);
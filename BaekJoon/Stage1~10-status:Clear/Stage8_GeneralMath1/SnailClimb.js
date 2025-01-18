const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [A, B, V] = input[0].split(" ").map(Number);

console.log(Math.ceil((V-B) / (A-B)));
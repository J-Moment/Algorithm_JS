const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let li = input[0].split(' ').map(Number);

const [max, secondMax, last] = li.sort((a, b) => b - a);

if(max < secondMax+last) console.log(max + secondMax + last);
else console.log((secondMax + last)*2 - 1);
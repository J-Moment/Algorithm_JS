const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let T = input.length;
for(let i = 0 ; i < T - 1 ; i++){
    let [first, second] = input[i].split(' ').map(Number);

    if(second % first === 0 ) console.log("factor");
    else if(first % second === 0 ) console.log("multiple");
    else console.log("neither");
}
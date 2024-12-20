const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = +input[0];
let dot = 3;
let rec = 2;
for(let i = 1 ; i < N ; i++){
    dot += rec;
    rec *= 2;
}

console.log(dot**2);
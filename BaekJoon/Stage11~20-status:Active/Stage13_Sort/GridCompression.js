const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = Number(input[0]);
let li = input[1].split(' ').map(Number);

const answer = [];
const set = Array.from(new Set([...li])).sort((a, b) => a - b);
const object = {};

set.forEach((item, idx) => object[item] = idx)

for(let i = 0 ; i < li.length; i++){
    answer.push(object[li[i]]);
}

console.log(answer.join(" "));
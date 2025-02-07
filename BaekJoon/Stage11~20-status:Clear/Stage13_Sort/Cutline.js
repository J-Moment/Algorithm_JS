const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let [N, k] = input[0].split(' ').map(Number);
let li = input[1].split(' ').map(Number);
li.sort((a, b) => b - a);

console.log(li[k-1]);
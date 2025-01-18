const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let [num, div] = input[0].split(' ').map(Number);

let ans = num.toString(div).toUpperCase();

console.log(ans);
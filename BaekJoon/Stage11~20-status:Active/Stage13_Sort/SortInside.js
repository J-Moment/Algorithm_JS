const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = input[0].split('').sort((a, b) => b - a).join("");

console.log(N);
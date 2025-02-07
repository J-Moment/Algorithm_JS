const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');
const result = (BigInt(input - 2) * BigInt(input - 1) * BigInt(input)) / BigInt(6);

console.log(`${result}`);
console.log(3);
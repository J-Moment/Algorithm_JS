const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');
let n = BigInt(input);
console.log(`${n*n*n}`);
console.log(3);
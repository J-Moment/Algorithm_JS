const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let [A, B] = input[0].split(' ').map(Number);
const gcd = (a, b) => a % b === 0 ? b : gcd(b, a % b);
const lcm = Math.floor((A*B) / gcd(A, B));

console.log(lcm);
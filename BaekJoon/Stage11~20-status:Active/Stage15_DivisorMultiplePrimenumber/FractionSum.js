const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let first = input[0].split(" ").map(Number);
let second = input[1].split(" ").map(Number);

const gcd = (a, b) => {
    return a % b === 0 ? b : gcd(b, a % b);
}

const numer = first[0] * second[1] + second[0] * first[1];
const denom = first[1] * second[1];
const divisor = gcd(numer, denom);

console.log(`${numer/divisor} ${denom/divisor}`);
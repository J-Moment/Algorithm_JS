const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let [N, div] = input[0].split(' ');

let ans = parseInt(N, Number(div));

console.log(ans);
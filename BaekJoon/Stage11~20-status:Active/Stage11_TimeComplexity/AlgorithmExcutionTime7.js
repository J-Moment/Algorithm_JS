const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');
let a1 = +input[0].split(' ')[0];
let a0 = +input[0].split(' ')[1];

let c = +input[1];
let n0 = +input[2];

const solution = (a1, a0, c, n0) => {
    if(a1* n0 + a0 <= c * n0 && a1 <= c)console.log(1);
    else console.log(0);
}

solution(a1, a0, c, n0);
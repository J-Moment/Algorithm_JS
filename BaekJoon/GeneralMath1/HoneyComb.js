const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = +input[0];

let startNum = 1;
let tmp = 6;
let ans = 1;

while(startNum < N){
    startNum += tmp;
    tmp += 6;
    ans++;
}

console.log(ans);
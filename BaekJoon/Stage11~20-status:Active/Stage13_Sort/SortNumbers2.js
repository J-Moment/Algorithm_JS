const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = input[0];

let li = [];
for(let i = 1; i <= N ; i++){
    li.push(Number(input[i]));
}

li.sort((a, b) => a - b);
console.log(li.join("\n"));
const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let li = [];
for(let item of input){
    li.push(Number(item));
}

li.sort((a, b) => a - b);

console.log(li.reduce((acc, cur) => acc+cur , 0) / 5);
console.log(li[2]);
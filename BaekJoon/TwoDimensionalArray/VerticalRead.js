const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let li = [];

for(let i = 0 ; i < 5 ; i++){
    li.push(input[i].split(''));
}

const maxLength = Math.max(...li.map(i => i.length));
let answer = "";

for (let i=0; i<maxLength; i++) {
    for (let j=0; j<li.length; j++) {
        if (input[j][i] !== undefined)
            answer += li[j][i];
    }
}

console.log(answer);
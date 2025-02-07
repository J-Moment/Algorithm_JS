const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = Number(input[0]);
let li = [];

for(let i = 1; i <= N ; i++){
    li.push(input[i].split(' ').map(Number));
}

li.sort((a, b) => {
    if(a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
})

for(let i = 0 ; i < li.length ; i++){
    console.log(li[i].join(" "));
}
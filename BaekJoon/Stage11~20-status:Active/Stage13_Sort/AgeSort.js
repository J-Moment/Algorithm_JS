const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = input[0];

let li = [];
for(let i = 1; i <= N ; i++){
    li.push(input[i].split(" "));
}

li.sort((a, b) => a[0] - b[0]);

for(let item of li){
    console.log(item.join(" "));
}
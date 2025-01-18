let fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

let [N, K] = input[0].split(' ').map(Number);
let li = input[1].split(' ').map(Number);

let tmp = 0;
for(let i = 0; i<K ; i++){
    tmp += li[i];
}

let max = tmp;

for (let i = 0 ; i < N-K; i++) {
    tmp += li[i+K];
    tmp -= li[i];
    if(max < tmp) max = tmp;
}

console.log(max);
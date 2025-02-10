let fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

let [N, M] = input[0].split(" ").map(Number);
let li = input[1].split(" ").map(Number);

let prefixSum = 0;
let remainderCount = Array(M).fill(0);
let result = 0;

remainderCount[0] = 1;

for (let i = 0; i < N; i++) {
    prefixSum += li[i];
    let remainder = prefixSum % M;
    
    if (remainder < 0) remainder += M;
    
    result += remainderCount[remainder];
    remainderCount[remainder]++;
}

console.log(result);
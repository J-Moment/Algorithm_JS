let fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let [N, M] = input[0].split(' ').map(Number);
let li = input[1].split(' ').map(Number);

const prefixSum = new Array(N + 1).fill(0);
const ans = [];

li.forEach((v, i) => {
    prefixSum[i + 1] = prefixSum[i] + v;
});

input.slice(2).forEach(tc => {
    const [a ,b] = tc.split(' ').map(Number);
    ans.push(prefixSum[b] - prefixSum[a - 1]);
});

console.log(ans.join('\n'));
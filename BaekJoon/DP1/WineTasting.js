const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

let [N, ...arr] = input;
arr = arr.map(Number);
N = +N;
let memo = new Array(N);
memo[0] = arr[0];
memo[1] = Math.max(arr[0] + arr[1], arr[1]);
memo[2] = Math.max(memo[0] + arr[2], arr[1] + arr[2], memo[1]);

for(let i = 3 ; i < N ; i++){
    memo[i] = Math.max(memo[i-3] + arr[i-1] + arr[i], memo[i - 2] + arr[i]);
    memo[i] = Math.max(memo[i-1], memo[i]);
}

console.log(memo[N-1]);
const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

const n = Number(input[0]);
const seq = input[1]
  .split(' ')
  .map((it) => Number(it))
  .sort((a, b) => a - b);
const x = Number(input[2]);
let cnt = 0;

let left = 0;
let right = n - 1;

while (left < right) {
  const sum = seq[left] + seq[right];
  if (sum === x) {
    cnt += 1;
    left += 1;
  } else if (sum < x) {
    left += 1;
  } else {
    right -= 1;
  }
}
console.log(cnt);
let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');

let N = +input[0];
let distance = input[1].split(' ').map(Number);
let cities = input[2].split(' ').map(Number);
let min = cities[0];

for(let i = 1 ; i < N ; i++) {
    min = Math.min(min, cities[i]);
    cities[i] = min;
}

let answer = BigInt(0);
for (let i = 0; i < N - 1; i++) {
  answer += BigInt(distance[i]) * BigInt(cities[i]);
}
console.log(String(answer));
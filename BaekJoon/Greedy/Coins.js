const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

let [N, K] = input[0].split(' ').map((item) => +item);
let numbers = [];

for (let i = 1; i <= N; i++) {
    numbers.push(Number(input[i]));
}
let cnt = 0;
let i = 0;
numbers.sort((a, b) => b - a);

while(K > 0) {
    if(K < numbers[i]) {
        i++;
    }
    else if(K - numbers[i] >= 0) {
        K -= numbers[i];
        cnt++;
    }
}

console.log(cnt);
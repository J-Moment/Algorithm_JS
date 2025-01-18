function solution(X, N) {
    let num1, num2;
    let sum = 0;
    for(let i = 0 ; i < N ; i++) {
        num1 = parseInt(input[i].split(' ')[0]);
        num2 = parseInt(input[i].split(' ')[1]);
        sum += num1*num2;
    }
    if(X === sum) console.log("Yes");
    else console.log("No");
}
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', function (line) {
    input.push(line);
}).on('close', function () {
    let X = parseInt(input.shift());
    let N = parseInt(input.shift());
    solution(X, N);
    process.exit();
});
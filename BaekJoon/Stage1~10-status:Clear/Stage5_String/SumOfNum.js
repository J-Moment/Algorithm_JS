function solution( N, M ) {
    let sum = 0;
    for (let i = 0 ; i < N ; i++) {
        sum+=parseInt(M[i]);
    }
    console.log(sum);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
  input.push(line)
})
  .on('close', function () {
    let N = parseInt(input[0]);
    let M = input[1].toString();
    solution(N, M);
  process.exit();
});
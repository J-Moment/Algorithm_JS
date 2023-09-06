function solution(N, X, arr) {
    let answer = "";
    for(let i = 0 ; i < N ; i++) {
        if(arr[i] < X) answer += arr[i] + ' ';
    }
    console.log(answer);
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
    let N = parseInt(input[0].split(' ')[0]);
    let X = parseInt(input[0].split(' ')[1]);
    let arr = input[1].split(' ').map((el) => parseInt(el));
    solution(N, X, arr);
  process.exit();
});
function solution(str, num) {
    console.log(str[num-1]);
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
    let str = input[0].toString();
    let num = parseInt(input[1]);
    solution(str, num);
  process.exit();
});
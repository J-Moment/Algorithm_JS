function solution (first, second) {
    const oneNum = second % 10;
    const tenNum = Math.floor((second % 100)/10);
    const hundredNum = Math.floor(second / 100);
    console.log(first * oneNum);
    console.log(first * tenNum);
    console.log(first * hundredNum);
    console.log(first * second);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input.push(line);
})
  .on('close', function () {
    const first = parseInt(input[0]);
    const second = parseInt(input[1]);
    solution(first, second);
  process.exit();
});
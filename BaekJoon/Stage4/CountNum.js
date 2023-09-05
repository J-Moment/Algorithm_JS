function solution(num, arr, v) {
    let answer = 0;
    for(let i = 0 ; i < num ; i++) {
        if(arr[i] === v)
        answer++;
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
    let num = input[0];
    arr = input[1].split(' ').map((el) => parseInt(el));
    let v = parseInt(input[2]);
    solution(num, arr, v);
  process.exit();
});
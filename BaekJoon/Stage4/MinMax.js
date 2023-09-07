function solution(num, arr) {
    let min = arr[0];
    let max = arr[0];
    for(let i = 1 ; i < num ; i++) {
        if(arr[i] < min) min = arr[i];
        if(arr[i] > max) max = arr[i]; 
    }
    console.log(`${min} ${max}`);
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
    solution(num, arr);
  process.exit();
});
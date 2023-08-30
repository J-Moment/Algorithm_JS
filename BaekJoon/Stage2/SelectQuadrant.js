function solution(x, y) {
    if(x > 0) {
        if(y > 0) {
            console.log("1");
        } else {
            console.log("4");
        }
    }
    else {
        if(y > 0) {
            console.log("2");
        } else {
            console.log("3");
        }
    }
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
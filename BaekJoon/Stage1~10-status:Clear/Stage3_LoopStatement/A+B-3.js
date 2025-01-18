function solution(num) {
    for (let i = 1; i <= num; i++) {
        let a = parseInt(input[i].split(' ')[0]);
        let b = parseInt(input[i].split(' ')[1]);

        console.log(a + b);
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
}).on('close', function () {
    let num = parseInt(input[0]);
    solution(num);
    process.exit();
});
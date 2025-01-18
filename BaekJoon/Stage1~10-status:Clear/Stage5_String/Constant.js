function solution ( A, B ) {
    let num1 = Number(A.split('').reverse().join(''));
    let num2 = Number(B.split('').reverse().join(''));

    console.log(num1 > num2 ? num1 : num2);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', function(line) {
    input.push(line);
  rl.close();
}).on("close", function() {
    const [A, B] = input[0].split(' ');
    solution(A, B);
  process.exit();
});
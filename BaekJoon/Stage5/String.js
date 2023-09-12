function solution( N ) {
    let len;
    for(let i = 1 ; i <= N ; i++) {
        len = input[i].length-1;
        console.log(input[i][0] + input[i][len]);
    }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', function(line) {
    input.push(line);
}).on("close", function() {
    let N = parseInt(input[0]);
    solution(N);
  process.exit();
});
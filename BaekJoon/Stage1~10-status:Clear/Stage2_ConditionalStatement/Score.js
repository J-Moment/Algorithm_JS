function solution(num) {
    if(num >= 90) console.log('A');
    else if(num >= 80) console.log('B');
    else if(num >= 70) console.log('C');
    else if(num >= 60) console.log('D');
    else console.log('F');
}

const readline = require('readline');
let input;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
    input = parseInt(line);
    rl.close();
}).on("close", function() {
    solution(input);
    process.exit();
});
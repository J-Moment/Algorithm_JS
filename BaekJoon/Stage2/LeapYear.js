function solution(num) {
    if(num % 400 === 0) {
        console.log("1");
    }
    else if(num % 4 === 0 && num % 100 !== 0){
        console.log("1");
    }
    else console.log("0");
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
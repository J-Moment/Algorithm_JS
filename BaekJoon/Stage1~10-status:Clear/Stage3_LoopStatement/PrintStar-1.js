function solution(num) {
    let answer = "";
    for (let i = 0; i < num; i++) {
        answer += "*"
        console.log(answer); 
    }
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
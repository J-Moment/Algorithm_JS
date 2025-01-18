function solution(num) {
    for (let i = 0; i < num; i++) {
        let answer = '';
          
        for (let j = num - 1; j >= 0; j--) {
            answer += j <= i ? '*' : ' ';
        }
        
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
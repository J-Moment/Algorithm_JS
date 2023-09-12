function solution(S) {
    let answer = "";
    for(let i = 97; i <= 122 ; i++){
        answer += S.indexOf(String.fromCharCode(i)) + ' ';
    }
    console.log(answer);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', function(line) {
    input.push(line.toString());
    rl.close();
}).on("close", function() {
    let S = input[0];
    solution(S);
  process.exit();
});
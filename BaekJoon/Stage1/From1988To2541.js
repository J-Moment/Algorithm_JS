function solution(input) {
  const result = input - 543;
  console.log(result);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input;
rl.on('line', function(line) {
  input = parseInt(line);
  rl.close();
}).on("close", function() {
  solution(input);
  process.exit();
});
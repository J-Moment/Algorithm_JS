function solution() {
    console.log(input[0].length);
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
    solution();
  process.exit();
});
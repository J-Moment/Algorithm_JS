function solution() {
    let arr = input[0].toString().trim().split(' ');
    console.log(arr[0] === "" ? 0 : arr.length);
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
    solution();
  process.exit();
});
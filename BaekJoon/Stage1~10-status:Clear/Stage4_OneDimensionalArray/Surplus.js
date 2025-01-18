function solution(arr) {
    const set = new Set(arr);
    const unique = [...set];
    console.log(unique.length);
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let input = [];
  
  rl.on('line', function (line) {
        input.push(line)
  })
    .on('close', function () {
        const arr = input.map((item) => item % 42);
        solution(arr);
    process.exit();
  });
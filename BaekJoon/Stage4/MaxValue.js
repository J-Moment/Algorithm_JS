function solution() {
    let max = Math.max(...input);

    console.log(max);
    console.log(input.indexOf(max) + 1);
}
  
  const readline = require('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let input = [];

  rl.on('line', function (line) {
    input.push(+line)
  })
    .on('close', function () {
        solution();
    process.exit();
  });
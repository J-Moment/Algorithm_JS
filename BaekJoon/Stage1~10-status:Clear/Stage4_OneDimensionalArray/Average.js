function solution( num ) {
    const arr = input[1].split(" ").map(el => +el);
    const max = Math.max(...arr);
    const sum = arr.reduce((a,b)=>a+b, 0);
    console.log(sum/(max*num) * 100);
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
        let num = parseInt(input[0]);
        solution(num);
    process.exit();
  });
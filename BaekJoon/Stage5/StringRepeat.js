function solution(T) {
  let answer = "";
    for(let i = 1 ; i <= T ; i++) {
      let answer = ""; 
      const [N, ch] = input[i].split(' ');
      for(let j = 0 ; j < ch.length ; j++) {
        for(let k = 0 ; k < parseInt(N); k++) {
          answer += ch[j];
        }
      }
      console.log(answer);
    }
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
    let T = parseInt(input[0]);
    solution(T);
  process.exit();
});
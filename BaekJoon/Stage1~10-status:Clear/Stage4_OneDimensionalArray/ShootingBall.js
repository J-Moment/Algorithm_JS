function solution( N, M ) {
  let arr = new Array(N);

  for(let i = 1 ; i <= M ; i++) {
    let [start, end, num] = input[i].split(" ").map(el => +el);

    for(start ; start <= end ; start++) {
      arr[start-1] = num;
    }
  }
  for(let i = 0 ; i < arr.length ; i++) {
    typeof arr[i] === "undefined" ? arr[i] = 0 : arr[i];
  }
  console.log(arr.join(" "));
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
    const [N, M] = input[0].split(" ").map(el => +el);
    solution(N, M);
  process.exit();
});
function solution( N, M ) {
    let arr = [];
    let tmp = 0;
    for(let i = 0 ; i < N ; i++) arr.push(i+1);

    for(let j = 1 ; j <= M ; j++) {
        const [start, end] = input[j].split(' ').map(el => +el);
        tmp = arr[start-1];
        arr[start-1] = arr[end-1];
        arr[end-1] = tmp;
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
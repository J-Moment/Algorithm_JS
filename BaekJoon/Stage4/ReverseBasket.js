function solution( N, M ) {
    let basket = [];
  
    for(let i=1; i<=N; i++){
        basket.push(i);
    };

    for(let i=1; i<=M; i++){
        let [a, b] = input[i].split(' ').map(el => +el);
        let arr = [];
        for(let j=a-1; j<b; j++){
            arr.push(basket[j])
        };
        arr.reverse();
        basket.splice(a-1, b-a+1, ...arr);
    }
    console.log(basket.join(' '))
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
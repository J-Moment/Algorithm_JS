const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

for (let i = 0; i < input.length; i++) {
  const num = parseInt(input[i]);
  const doubleNum = num * 2;
  let count = 0;

  if (num === 0) {
    break;
  }
  if (num === 1) {
    count++;
  }

  for (let j = num + 1; j < doubleNum; j++) {
    let isPrime = true;

    for (let k = 2; k <= Math.sqrt(j); k++) {
      if (j % k === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) count++;
  }

  console.log(count);
}

/*
문제 재정의 : 숫자 N이 주어졌을 때 2N과의 사이에서 소수가 몇개인지 판별

세부분석 : 주어진 시간은 1초이다. 결국은 시간을 줄여야 하는 문제이다.

for문으로 계산한다면 돈다면 O(N)일 것이고, sqrt로 제곱근까지 계산한다면 O(N^0.5)가 될 것이다.
소수판별식에서 사용하는 에라토스테네스의 체는 O(Nlog(logN))으로 구현 가능하다.
*/
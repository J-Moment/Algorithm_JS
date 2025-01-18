const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = +input[0];
let numList = input[1].split(" ").map(Number);
//순서 : + - * /
let operatorList = input[2].split(" ").map(Number);

let [max, min] = [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];

const calculator = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  //이 문제의 포인트 => 나눗셈은 정수 나눗셈으로 몫만 취한다. 음수를 양수로 나눌 때는 C++14의 기준을 따른다. 즉, 양수로 바꾼 뒤 몫을 취하고, 그 몫을 음수로 바꾼 것과 같다
  //음수일 땐 Math.ceil로 올림을 해야 하고, 양수일 땐 Math.floor로 내림을 해야한다. 하지만 비트연산자를 활용하면 js는 32비트 정수만을 내부적으로 소수점을 버린다. 이를 활용하면 간단하게 처리 할 수 있다.
  (a, b) => ~~(a/b),
];

const dfs = (depth, result) => {
  if (depth === N - 1) {
    max = Math.max(max, result);
    min = Math.min(min, result);
  } else {
    for (let i = 0; i < operatorList.length; i++) {
      if (operatorList[i] !== 0) {
        operatorList[i]--;
        dfs(depth + 1, calculator[i](result, numList[depth + 1]));
        operatorList[i]++;
      }
    }
  }
};

dfs(0, numList[0]);

console.log(max);
console.log(min);

/*
문제 : 수열이 주어지고 연산자의 개수가 주어졌을 때, 수식을 만들어 최대값과 최솟값을 만들 것

1.
입력값 : 연산자, 수열
출력값: 최대값, 최소값

세부분석 : 
1. 수열을 나열한다.
2. 사이에 연산자를 돌아가면서 하나씩 끼워본다. => 완전탐색 dfs
3. max와 Min을 비교하며 업데이트한다.

*/
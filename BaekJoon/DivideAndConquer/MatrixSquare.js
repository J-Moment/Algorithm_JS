const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0].split(" ")[0]);
let B = BigInt(input[0].split(" ")[1]);

let matrix = [];

for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

const multiplyMatrix = (Amatrix, Bmatrix) => {
    let result = [];
    for (let i = 0; i < N; i++) {
      let row = [];
      for (let j = 0; j < N; j++) {
        let sum = 0;
        for (let k = 0; k < N; k++) {
          sum = (sum + (Amatrix[i][k] * Bmatrix[k][j]) % 1000) % 1000;
        }
        row.push(sum);
      }
      result.push(row);
    }
    return result;
}

const SquareCalculation = (times) => {
  if (times === 1n) {
    return matrix.map(row => row.map(value => value % 1000));
  }
  else {
    const half = SquareCalculation(times / 2n);
    const halfCalc = multiplyMatrix(half, half);

    if(times % 2n === 0n){
        return halfCalc;
    } else {
        return multiplyMatrix(halfCalc, matrix);
    }
  }
};

const answer = SquareCalculation(B);

answer.forEach(row => console.log(row.join(" ")));

/*
문제 재정의 : 행렬을 recursion으로 제곱시킨다.

세부분석 : 1. N x N의 단위 행렬을 만든다.
2. times가 1일때까지 times를 줄이며 재귀한다.
3. times가 1일때 주어진 행렬을 리턴한다.
4. 2번과정에서 리턴 받은 행렬로 matrix와 곱셈 후 리턴한다.

런타임 에러 발생 => 분할정복으로 푼다.
*/
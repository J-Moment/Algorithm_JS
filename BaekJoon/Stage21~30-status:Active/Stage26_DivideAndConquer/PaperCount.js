const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let li = [];

let [plusOne, zero, minusOne] = [0, 0, 0];

for (let i = 1; i <= N; i++) {
  li.push(input[i].split(" ").map(Number));
}

const divideAndConquer = (x, y, N) => {
  if (N === 1) {
    if (li[y][x] === 1) plusOne++;
    else if (li[y][x] === 0) zero++;
    else minusOne++;
    return;
  }

  let first = li[y][x];
  let isSame = true;

  for (let i = y; i < y + N; i++) {
    for (let j = x; j < x + N; j++) {
      if (li[i][j] !== first) {
        isSame = false;
        break;
      }
    }
    if (!isSame) break;
  }

  if (isSame) {
    if (first === 1) plusOne++;
    else if (first === 0) zero++;
    else minusOne++;
    return;
  } else {
    let threeDivide = Math.floor(N / 3);
    divideAndConquer(x, y, threeDivide);
    divideAndConquer(x, y + threeDivide, threeDivide);
    divideAndConquer(x, y + threeDivide * 2, threeDivide);
    divideAndConquer(x + threeDivide, y, threeDivide);
    divideAndConquer(x + threeDivide, y + threeDivide, threeDivide);
    divideAndConquer(x + threeDivide, y + threeDivide * 2, threeDivide);
    divideAndConquer(x + threeDivide * 2, y, threeDivide);
    divideAndConquer(x + threeDivide * 2, y + threeDivide, threeDivide);
    divideAndConquer(x + threeDivide * 2, y + threeDivide * 2, threeDivide);
  }
};
divideAndConquer(0, 0, N);

console.log(minusOne);
console.log(zero);
console.log(plusOne);
/*
문제 재정의 : 주어진 배열을 크기와 상관없이 1, 0, -1로만 묶어진 갯수를 카운트한다.

세부 분석 :
빠르게 정렬 하려면 N개의 수들을 찾을 때의 속도를 높여야한다.
1. 해당하는 조각이 모두 동일한 숫자라면 답에 해당하는 숫자를 추가한다.
2. 동일하지 않다면 N/3만큼 크기를 나누어 재귀로 찾는다..
3. 숫자 하나로 할당 될 때 까지 혹은 1번을 만족할 때 까지 2번을 반복한다.
*/
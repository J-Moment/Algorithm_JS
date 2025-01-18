const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let li = [];

let ans = "";
for (let i = 1; i <= N; i++) {
  li.push(input[i].split("").map(Number));
}

const divideAndConquer = (x, y, N) => {
  if (N === 1) {
    ans += li[y][x];
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
    if (first === 0) ans += "0";
    else ans += "1";
    return;
  }
  else {
    let half = Math.floor(N / 2);
    ans += "(";
    divideAndConquer(x, y, half);
    divideAndConquer(x + half, y, half);
    divideAndConquer(x, y + half, half);
    divideAndConquer(x + half, y + half, half);
    ans += ")";
  }
};
divideAndConquer(0, 0, N);
console.log(ans);

/*
문제 재정의 : 주어진 배열을 1, 2, 4, 3분면 순으로 나눠가며 압축시킨다.

세부 분석 :
빠르게 정렬 하려면 N개의 수들을 찾을 때의 속도를 높여야한다.
1. 해당하는 조각이 모두 동일한 숫자라면 답에 해당하는 숫자를 추가한다.
2. 동일하지 않다면 괄호를 추가하고 1, 2, 4, 3분면 순으로 재귀를 진행하고 괄호를 닫는다.
3. 숫자 하나로 할당 될 때 까지 혹은 1번을 만족할 때 까지 2번을 반복한다.
*/
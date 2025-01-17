const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = BigInt(input[0]);

let MOD = 1000000007n
let fibo = [];

const M =[[1n, 1n], [1n, 0n]];

const multiplyMatrix = (A, B) => {
    return [
      [
        (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % MOD,
        (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % MOD,
      ],
      [
        (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % MOD,
        (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % MOD,
      ],
    ];
};

const fibonacci = (num) => {
    if(num === 0n) return 0n;
    else if(num === 1n) return 1n;
    else {
        const resultMatrix = SquareCalculation(num-1n);
        return resultMatrix[0][0];
    }
}

const SquareCalculation = (times) => {
    if (times === 1n) {
      return M;
    }
    else {
      const half = SquareCalculation(times / 2n);
      const halfCalc = multiplyMatrix(half, half);
  
      if(times % 2n === 0n){
          return halfCalc;
      } else {
          return multiplyMatrix(halfCalc, M);
      }
    }
  };

let ans = Number(fibonacci(N));

console.log(ans);
/*
문제 재정의 : 피보나치 수열을 dp가 아닌 분할정복으로 해결할 것

세부분석 : 시간을 어떻게 줄일지 고민해야 한다.
F(n) = F(n-1) + F(n-2)를 트리로 그리면 점화식이 나온다. => 해당 문제의 의도가 아니므로 패스
ex) F(n) = F(n-1) + F(n-2) = 2F(n-2) + F(n-3) = 3F(n-3) + 2F(n-4) = ...

1. 행렬로 접근한다. [[F(n)], [F(n-1)]] = [[1, 1], [1, 0]] * [[F(n-1)], [F(n-2)]]
2. [[1, 1], [1, 0]]를 M으로 치환하면 [[F(n+1)], [F(n)]  = M^n * [[F(1)], F(0)] 이라는 결론이 나온다.
3. 2번식에 F(1) = 1, F(0) = 0을 대입하고, n = 1을 대입하서 정리하고, n = k를 대입해서 점화식을 만들어보면 M^n = [[F(k+1), F(k)], [F(k), F(k-1)]]이라는 공식이 나온다.
4. 2번식과 3번식을 통해 X^(M+N) 형태를 만들 수 있으므로 n제곱을 2n or 2n+1 형태로 변환시켜 분할정복으로 구현한다.
5. 결론 : F(2n) = F(n+1)*F(n) + F(n)*F(n-1)  / F(2n+1) = F(n-1)^2 + F(n)^2
6. 5번을 활용해 memo로 풀수 있다 그러나 3번을 활용해 분할정복으로 풀어보려 한다.
*/
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [A, B, C] = input[0].split(' ').map(BigInt);

const divideAndConquer = (pow) => {
    if(pow === 1n) {
        return A % C;
    }
    let halfpow = pow / 2n;
    let halfResult = divideAndConquer(halfpow) % C;

    if(pow % 2n === 0n) {
        return (halfResult * halfResult) % C;
    }
    else {
        return (halfResult * halfResult * (A % C)) % C;
    }
}

console.log(Number(divideAndConquer(B)))
/*
문제 재정의 : A를 B번 곱한값을 C로 나눈값을 구하는 문제

세부분석 : 시간을 단축시키는 것이 중요하므로 A%B = C와 ((A%C) * (B%C)) % C가 같다는 분배법칙을 활용
1. A^B % C를 (A^(B/2) % C * A^(B/2) % C) % C로 치환한다.
2. B에 대하여 재귀를 통해 B가 1일때 까지 반으로 나누어 가며 값을 구해나간다.
3. 1번과 2번과정을 통해 얻은 값을 홀수와 짝수의 경우를 나누어 값을 합친다.
*/
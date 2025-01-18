const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, K] = input[0].split(' ').map(Number);

const p = BigInt(1000000007);

const pow = (a, b) => {
    let result = BigInt(1);
    a = a % p;
    while (b > 0) {
        if (b % BigInt(2) === BigInt(1)){
            result = (result * a) % p;
        }
        a = (a * a) % p;
        b = b/BigInt(2);
    }
    return result;
};


let factorial = new Array(N+1).fill(BigInt(1));
for(let i = 2 ; i <= N ; i++){
    factorial[i] = (factorial[i-1] * BigInt(i)) % p;
}

let A = factorial[N];
let B = (factorial[N-K] * factorial[K]) % p;

let Binverse = pow(B, p-BigInt(2));

console.log(Number((A*Binverse) % p));

/*
문제 재정의 : 아항계수를 1,000,000,007로 나눈 나머지를 구하기

세부분석 : 시간 제한이 1초 이므로 특별한 무언가의 정리가 필요해 보인다.
분배법칙 활용 : {n!/(k!(n-k)!)}%1,000,000,007 = {n!%1,000,000,007 / (k!(n-k)!)^-1 % 1,000,000,007} %1,000,000,007
페르마의 소정리: p가 소수이고, a와 p가 서로소이면 a^(p-1) = 1 % p =>> a * a^(p-2) = 1 % p 이다
따라서 모듈러 연산에 있어서 한 자연수 a에 대한 역원은 a^(p^2) 이다.

결론 : {n!/(k!(n-k)!)}%1,000,000,007 = {n!%1,000,000,007 * (k!(n-k)!)^(1,000,000,007-2)%1,000,000,007 }%1,000,000,007

주의사항 : 재귀로 제곱을 표현할때 커지는 수가 오버플로우가 날 수 있다. 이를 BigInt로 처리할 것
*/
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = Number(input[0]);
const isPrime = Array(N + 1).fill(true);
isPrime[0] = isPrime[1] = false;
for (let i = 2; i * i <= N; i++) {
    if (isPrime[i]) {
        for (let j = i * i; j <= N; j += i) {
            isPrime[j] = false;
        }
    }
}
const primes = [];
for (let i = 2; i <= N; i++) {
    if (isPrime[i]) primes.push(i);
}

let left = 0, right = 0, sum = 0, count = 0;

while (true) {
    if (sum >= N) {
        if (sum === N) count++;
        sum -= primes[left++];
    } else if (right === primes.length) break;
    else sum += primes[right++];
}

console.log(count);
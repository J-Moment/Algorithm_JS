const fs = require("fs");

const [N, A] = fs.readFileSync("/dev/stdin").toString().trim().split(" ").map(BigInt);

function extendedGCD(a, b) {
  let s0 = 1n, s1 = 0n;
  let r0 = a, r1 = b;

  while (r1 !== 0n) {
    const q = r0 / r1;
    [r0, r1] = [r1, r0 - q * r1];
    [s0, s1] = [s1, s0 - q * s1];
  }

  return [r0, s0];
}

const additiveInverse = (N - A) % N;

const [gcd, x] = extendedGCD(A, N);

let multiplicativeInverse;
if (gcd !== 1n) {
  multiplicativeInverse = -1;
} else {
  multiplicativeInverse = ((x % N) + N) % N;
}

console.log(`${additiveInverse} ${multiplicativeInverse}`);
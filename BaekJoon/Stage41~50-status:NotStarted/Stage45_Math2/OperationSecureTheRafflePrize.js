const fs = require("fs");
const [m, seed, x1, x2] = fs.readFileSync("/dev/stdin").toString().trim().split(" ").map(BigInt);

function modInv(a, m) {
  let m0 = m,
    x0 = 0n,
    x1 = 1n;
  while (a > 1n) {
    const q = a / m;
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }
  return x1 < 0n ? x1 + m0 : x1;
}

const deltaX = (x1 - seed + m) % m;
const deltaY = (x2 - x1 + m) % m;

const inv = modInv(deltaX, m);
const a = (deltaY * inv) % m;
const c = (x1 - a * seed + m * m) % m;

console.log(`${a.toString()} ${c.toString()}`);
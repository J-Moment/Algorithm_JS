const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const M = +input[0];
const MOD = 1000000007n;

let maxN = 0;
const queries = [];
for (let i = 1; i <= M; i++) {
  const [n, k] = input[i].split(" ").map(Number);
  queries.push([BigInt(n), BigInt(k)]);
  maxN = Math.max(maxN, n);
}

const fact = Array(maxN + 1);
const invFact = Array(maxN + 1);
fact[0] = 1n;
for (let i = 1; i <= maxN; i++) {
  fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
}

function modPow(a, b, mod) {
  let res = 1n;
  a %= mod;
  while (b > 0) {
    if (b % 2n === 1n) res = (res * a) % mod;
    a = (a * a) % mod;
    b = b / 2n;
  }
  return res;
}

invFact[maxN] = modPow(fact[maxN], MOD - 2n, MOD);
for (let i = maxN - 1; i >= 0; i--) {
  invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
}

const result = [];
for (const [n, k] of queries) {
  const comb = (((fact[n] * invFact[k]) % MOD) * invFact[n - k]) % MOD;
  result.push(comb.toString());
}

console.log(result.join("\n"));
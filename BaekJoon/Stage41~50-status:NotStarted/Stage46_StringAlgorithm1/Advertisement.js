const fs = require("fs");
const [l, s] = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
const L = Number(l);
const S = s;

const pi = new Uint32Array(L);
let j = 0;
for (let i = 1; i < L; i++) {
  while (j > 0 && S[i] !== S[j]) {
    j = pi[j - 1];
  }
  if (S[i] === S[j]) {
    j++;
    pi[i] = j;
  }
}

const period = L - pi[L - 1];
console.log(period);
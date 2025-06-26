const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const t = +input[0];

function extendedGCD(a, b) {
  let s0 = 1n,
    s1 = 0n;
  let t0 = 0n,
    t1 = 1n;
  let r0 = a,
    r1 = b;

  while (r1 !== 0n) {
    const q = r0 / r1;
    [r0, r1] = [r1, r0 - q * r1];
    [s0, s1] = [s1, s0 - q * s1];
    [t0, t1] = [t1, t0 - q * t1];
  }

  return [r0, s0, t0];
}

for (let i = 1; i <= t; i++) {
  let [K, C] = input[i].split(" ").map(BigInt);

  if (C === 1n) {
    if (K + 1n > 1_000_000_000n) {
      console.log("IMPOSSIBLE");
    } else {
      console.log((K + 1n).toString());
    }
    continue;
  }

  if (K === 1n) {
    console.log("1");
    continue;
  }

  const [gcd, x, y] = extendedGCD(C, K);

  if (gcd !== 1n) {
    console.log("IMPOSSIBLE");
    continue;
  }

  let n = x % K;
  if (n < 0n) n += K;

  if (n > 1_000_000_000n) {
    console.log("IMPOSSIBLE");
  } else {
    console.log(n.toString());
  }
}
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);

const t = Number(input[0]);

if (t === 1) {
  let k = BigInt(input[1]) + BigInt(input[2]);
  const LEN = 13;
  const s = Array(LEN).fill("a");
  for (let i = 0; i < LEN; i++) {
    if (k > 0n) {
      const rem = k % 26n;
      s[i] = String.fromCharCode(Number(rem) + 97);
      k /= 26n;
    } else {
      break;
    }
  }
  process.stdout.write(s.join(""));
} else {
  const s = input[1];
  let ans = 0n;
  let base = 1n;
  for (let i = 0; i < s.length; i++) {
    ans += BigInt(s.charCodeAt(i) - 97) * base;
    base *= 26n;
  }
  process.stdout.write(ans.toString());
}
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split(/\s+/);
const N = Number(input[0]);
const nums = input.slice(1, N + 1).map(Number);

let maxXor = 0;
let mask = 0;

for (let bit = 30; bit >= 0; bit--) {
  mask |= 1 << bit;
  const candidates = new Set();

  for (const num of nums) {
    candidates.add(num & mask);
  }

  const testXor = maxXor | (1 << bit);
  let found = false;

  for (const prefix of candidates) {
    if (candidates.has(prefix ^ testXor)) {
      found = true;
      break;
    }
  }

  if (found) {
    maxXor = testXor;
  }
}

console.log(maxXor);
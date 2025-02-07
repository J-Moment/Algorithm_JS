const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);

let gaplist = [];
for (let i = 1; i < N; i++) {
    gaplist.push(Number(input[i + 1]) - Number(input[i]));
}

const getGcd = (a, b) => (a % b === 0 ? b : getGcd(b, a % b));

let gcd = 0;
let ans = 0;

for (let i = 0; i < gaplist.length; i++) {
    gcd = getGcd(gcd, gaplist[i]);
}

gaplist.forEach((v) => {
  if (v > gcd) ans += v / gcd - 1;
});

console.log(ans);
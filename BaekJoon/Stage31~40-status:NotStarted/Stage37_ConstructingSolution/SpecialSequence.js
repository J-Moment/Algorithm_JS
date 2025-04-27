const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");
const n = parseInt(input[0]);
const k = parseInt(input[1]);

if (n === k) {
  console.log("Impossible");
} else {
  const result = [];
  result.push(n - k);
  for (let i = 1; i < n - k; i++) {
    result.push(i);
  }
  for (let i = n - k + 1; i <= n; i++) {
    result.push(i);
  }
  console.log(result.join(" "));
}
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = parseInt(input[0], 10);

const jobs = [];
for (let i = 1; i <= N; i++) {
  const [Ti, Si] = input[i].split(" ").map(Number);
  jobs.push({ idx: i, T: Ti, S: Si });
}

jobs.sort((a, b) => {
  const lhs = a.S * b.T;
  const rhs = b.S * a.T;
  if (lhs !== rhs) return rhs - lhs;
  return a.idx - b.idx;
});

const order = jobs.map((job) => job.idx).join(" ");
console.log(order);
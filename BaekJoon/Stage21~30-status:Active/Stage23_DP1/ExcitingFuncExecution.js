const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");
input.pop();

const arr = Array.from({ length: 51 }, () =>
  Array.from({ length: 51 }, () => Array(51).fill(0))
);
const w = (a, b, c) => {
  if (a <= 0 || b <= 0 || c <= 0) {
    return 1;
  }
  if (a > 20 || b > 20 || c > 20) {
    return w(20, 20, 20);
  }

  if (arr[a][b][c]) return arr[a][b][c];

  if (a < b && b < c) {
    arr[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
  } else {
    arr[a][b][c] =
      w(a - 1, b, c) +
      w(a - 1, b - 1, c) +
      w(a - 1, b, c - 1) -
      w(a - 1, b - 1, c - 1);
  }

  return arr[a][b][c];
}

const result = input.map((line) => {
  const [a, b, c] = line.split(" ").map(Number);
  return `w(${a}, ${b}, ${c}) = ${w(a, b, c)}`;
});

console.log(result.join("\n"));
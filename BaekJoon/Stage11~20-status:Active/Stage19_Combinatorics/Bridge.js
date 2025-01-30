const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let T = Number(input[0]);

for (let i = 1; i <= T; i++) {
  let [N, M] = input[i].split(" ").map(Number);

  let surplus = M-N > N ? N : M-N;

  let Nume = 1;
  let Deno = 1;

  for (let i = 1; i <= surplus; i++) {
    Nume *= M - i + 1;
    Deno *= i;
  }

  console.log(Nume / Deno);
}

/*
    mCm-n
*/
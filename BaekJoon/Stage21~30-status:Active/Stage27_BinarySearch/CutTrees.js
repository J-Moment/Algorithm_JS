let fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let trees = input[1].split(" ").map(Number);

let start = 0;
let end = Math.max(...trees);

let result = 0;
while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let wood = 0;

  for (let tree of trees) {
    if (tree > mid) {
      wood += tree - mid;
    }
  }

  if (wood >= M) {
    result = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(result);
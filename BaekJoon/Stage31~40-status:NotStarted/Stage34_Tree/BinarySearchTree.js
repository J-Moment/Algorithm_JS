const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let li = input.map(Number);

let result = [];

function postOrder(start, end) {
  if (start > end) return;

  const root = li[start];
  let divide = end + 1;

  for (let i = start + 1; i <= end; i++) {
    if (li[i] > root) {
      divide = i;
      break;
    }
  }

  postOrder(start + 1, divide - 1);

  postOrder(divide, end);

  result.push(root);
}

postOrder(0, li.length - 1);
console.log(result.join("\n"));
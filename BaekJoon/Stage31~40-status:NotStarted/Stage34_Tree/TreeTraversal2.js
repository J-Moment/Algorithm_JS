const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = +input[0];
const inOrder = input[1].split(' ').map(Number);
const postOrder = input[2].split(' ').map(Number);

const inOrderIndex = {};
inOrder.forEach((val, idx) => {
  inOrderIndex[val] = idx;
});

let result = [];

function build(inStart, inEnd, postStart, postEnd) {
  if (inStart > inEnd || postStart > postEnd) return;

  const root = postOrder[postEnd];
  result.push(root);

  const rootIdx = inOrderIndex[root];
  const leftSize = rootIdx - inStart;

  build(inStart, rootIdx - 1, postStart, postStart + leftSize - 1);

  build(rootIdx + 1, inEnd, postStart + leftSize, postEnd - 1);
}

build(0, n - 1, 0, n - 1);
console.log(result.join(' '));
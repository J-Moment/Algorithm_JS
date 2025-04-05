const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const n = Number(input[0]);
const tree = {};

for (let i = 1; i <= n; i++) {
  const [parent, left, right] = input[i].split(' ');
  tree[parent] = [left, right];
}

function preorder(node) {
  if (node === '.') return '';
  const [left, right] = tree[node];
  return node + preorder(left) + preorder(right);
}

function inorder(node) {
  if (node === '.') return '';
  const [left, right] = tree[node];
  return inorder(left) + node + inorder(right);
}

function postorder(node) {
  if (node === '.') return '';
  const [left, right] = tree[node];
  return postorder(left) + postorder(right) + node;
}

const root = 'A';
console.log(preorder(root));
console.log(inorder(root));
console.log(postorder(root));
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const firstLine = input[0];
const [N, C] = firstLine.split(" ").map(Number);

const secondLine = input[1];
const weights = secondLine.split(" ").map(Number);

function getSubsetSums(arr) {
  const result = [];

  const dfs = (idx, sum) => {
    if (sum > C) return;
    if (idx === arr.length) {
      result.push(sum);
      return;
    }
    dfs(idx + 1, sum);
    dfs(idx + 1, sum + arr[idx]);
  };

  dfs(0, 0);
  return result;
}

const leftArr = weights.slice(0, Math.floor(N / 2));
const rightArr = weights.slice(Math.floor(N / 2));

const leftSums = getSubsetSums(leftArr);
const rightSums = getSubsetSums(rightArr);
rightSums.sort((a, b) => a - b);

const upperBound = (arr, target) => {
  let low = 0,
    high = arr.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] <= target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

let count = 0;
for (const sum of leftSums) {
  const remain = C - sum;
  count += upperBound(rightSums, remain);
}

console.log(count);
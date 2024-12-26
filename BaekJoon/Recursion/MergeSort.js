const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [A, K] = input[0].split(" ").map(Number);
let li = input[1].split(" ").map(Number);

let count = 0;
let target;

const mergeSort = (arr) => {
  if (arr.length === 1) return arr;
  let mid = Math.ceil(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
};

const merge = (arr1, arr2) => {
  let result = [];
  let [i, j] = [0, 0];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
    count++;
    if (count === K) target = result[result.length - 1];
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
    count++;
    if (count === K) target = result[result.length - 1];
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
    count++;
    if (count === K) target = result[result.length - 1];
  }
  return result;
};

mergeSort(li);
if (!target) target = -1;
console.log(target);
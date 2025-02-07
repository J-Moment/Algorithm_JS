const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let li = [];
for (let i = 1; i <= N; i++) {
  li.push(Number(input[i]));
}

//산술평균
console.log(Math.round(li.reduce((acc, cur) => acc + cur, 0) / N) || 0);

//중앙값
li.sort((a, b) => a - b);
console.log(li[Math.floor(li.length / 2)]);

//최빈값
const countMap = new Map();
let max = Number.MIN_SAFE_INTEGER;

for (let num of li) {
  if (countMap.has(num)) countMap.set(num, countMap.get(num) + 1);
  else countMap.set(num, 1);
  max = Math.max(max, countMap.get(num));
}

const maxArr = [];
for (let [key, val] of countMap) {
  if (val === max) maxArr.push(key);
}

maxArr.sort((a, b) => a - b);
let mode = maxArr.length > 1 ? maxArr[1] : maxArr[0];
console.log(mode);

//최대값 - 최솟값
console.log(N > 1 ? Math.abs(li[li.length - 1] - li[0]) : 0);
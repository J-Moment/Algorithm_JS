const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
const N = input[0];
const arr = input.slice(1);

const tmp = new Array(N);
let invCount = 0;

function mergeSort(left, right) {
  if (left >= right) return;
  const mid = (left + right) >> 1;
  mergeSort(left, mid);
  mergeSort(mid + 1, right);

  let i = left;
  let j = mid + 1;
  let k = left;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      tmp[k++] = arr[i++];
    } else {
      invCount += mid - i + 1;
      tmp[k++] = arr[j++];
    }
  }
  while (i <= mid) {
    tmp[k++] = arr[i++];
  }
  while (j <= right) {
    tmp[k++] = arr[j++];
  }
  for (let idx = left; idx <= right; idx++) {
    arr[idx] = tmp[idx];
  }
}

mergeSort(0, N - 1);
console.log(invCount);
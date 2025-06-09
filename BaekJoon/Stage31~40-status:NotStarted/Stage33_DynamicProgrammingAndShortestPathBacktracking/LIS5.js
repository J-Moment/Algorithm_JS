const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
const N = input[0];
const A = input.slice(1);

const L = [];
const L_id = [];
const P = new Array(N);

function lowerBound(arr, x) {
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

for (let i = 0; i < N; i++) {
  const x = A[i];
  const pos = lowerBound(L, x);
  if (pos === L.length) {
    L.push(x);
    L_id.push(i);
  } else {
    L[pos] = x;
    L_id[pos] = i;
  }
  P[i] = pos > 0 ? L_id[pos - 1] : -1;
}

const len = L.length;

const lis = new Array(len);
let k = L_id[len - 1];
for (let i = len - 1; i >= 0; i--) {
  lis[i] = A[k];
  k = P[k];
}

let out = len + "\n" + lis.join(" ");
process.stdout.write(out);
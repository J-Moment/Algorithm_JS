const fs = require("fs");

const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;
const C = data[ptr++];
const N = data[ptr++];

const chickens = data.slice(ptr, ptr + C);
ptr += C;
chickens.sort((a, b) => a - b);

const cows = [];
for (let i = 0; i < N; i++) {
  const A = data[ptr++];
  const B = data[ptr++];
  cows.push([A, B]);
}
cows.sort((x, y) => x[1] - y[1]);

class Fenwick {
  constructor(n) {
    this.n = n;
    this.f = new Uint32Array(n + 1);
  }
  add(i, v) {
    for (; i <= this.n; i += i & -i) {
      this.f[i] += v;
    }
  }
  sum(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) {
      s += this.f[i];
    }
    return s;
  }
  findByPrefix(k) {
    let idx = 0;
    let bit = 1 << Math.floor(Math.log2(this.n));
    while (bit) {
      const ni = idx + bit;
      if (ni <= this.n && this.f[ni] < k) {
        k -= this.f[ni];
        idx = ni;
      }
      bit >>= 1;
    }
    return idx + 1;
  }
}

const bit = new Fenwick(C);

for (let i = 1; i <= C; i++) bit.add(i, 1);

let answer = 0;
for (const [A, B] of cows) {
  const l = lowerBound(chickens, A);
  const r = upperBound(chickens, B) - 1;
  if (l < C && l <= r) {
    const cnt = bit.sum(r + 1) - bit.sum(l);
    if (cnt > 0) {
      const k = bit.sum(l) + 1;
      const idx = bit.findByPrefix(k) - 1;
      bit.add(idx + 1, -1);
      answer++;
    }
  }
}

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
function upperBound(arr, x) {
  let lo = 0,
    hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

console.log(answer);
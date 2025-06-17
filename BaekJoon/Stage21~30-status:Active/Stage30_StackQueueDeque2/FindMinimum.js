const fs = require("fs");
const data = fs.readFileSync(0, "utf8");
let p = 0,
  len = data.length;

function readInt() {
  while (p < len && data[p] <= " ") p++;
  let sign = 1;
  if (data[p] === "-") {
    sign = -1;
    p++;
  }
  let n = 0;
  while (p < len && data[p] >= "0") {
    n = n * 10 + (data.charCodeAt(p) - 48);
    p++;
  }
  return n * sign;
}

const N = readInt();
const L = readInt();

const dqVal = new Int32Array(N);
const dqIdx = new Int32Array(N);
let head = 0,
  tail = 0;

const out = new Array(N);

for (let i = 1; i <= N; i++) {
  const v = readInt();
  while (tail > head && dqVal[tail - 1] > v) {
    tail--;
  }
  dqVal[tail] = v;
  dqIdx[tail] = i;
  tail++;
  if (dqIdx[head] <= i - L) {
    head++;
  }
  out[i - 1] = dqVal[head];
}

process.stdout.write(out.join(" "));
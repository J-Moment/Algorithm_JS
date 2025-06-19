const fs = require("fs");

const data = fs.readFileSync(0, "utf8");
let p = 0,
  L = data.length;
function readInt() {
  while (p < L && data[p] <= " ") p++;
  let sign = 1;
  if (data[p] === "-") {
    sign = -1;
    p++;
  }
  let v = 0;
  while (p < L && data[p] >= "0" && data[p] <= "9") {
    v = v * 10 + (data.charCodeAt(p) - 48);
    p++;
  }
  return v * sign;
}

const N = readInt();
const D = readInt();

const dq = new Int32Array(N);
let head = 0,
  tail = 0;

let ans = -Infinity;
const dp = new Float64Array(N);

for (let i = 0; i < N; i++) {
  const Ki = readInt();
  // remove out‐of‐window indices
  while (head < tail && dq[head] < i - D) head++;
  const best = head < tail ? dp[dq[head]] : 0;
  // dp[i]
  const cur = best > 0 ? best + Ki : Ki;
  dp[i] = cur;
  if (cur > ans) ans = cur;
  while (head < tail && dp[dq[tail - 1]] <= cur) tail--;
  dq[tail++] = i;
}

process.stdout.write(ans.toString());

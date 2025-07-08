const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;
const T = input[ptr++];

const out = [];
for (let tc = 0; tc < T; tc++) {
  const n = input[ptr++];
  const pts = [];
  const ys = [];
  for (let i = 0; i < n; i++) {
    const x = input[ptr++];
    const y = input[ptr++];
    pts.push([x, y]);
    ys.push(y);
  }

  ys.sort((a, b) => a - b);
  const comp = new Map();
  let cid = 1;
  for (const y of ys) {
    if (!comp.has(y)) comp.set(y, cid++);
  }
  const m = cid;

  pts.sort((A, B) => A[0] - B[0] || B[1] - A[1]);

  const BIT = new Uint32Array(m + 1);
  const NBIT = m;
  function bitUpdate(i) {
    for (; i <= NBIT; i += i & -i) BIT[i]++;
  }
  function bitSum(i) {
    let s = 0;
    for (; i > 0; i -= i & -i) s += BIT[i];
    return s;
  }

  let ans = 0;
  let processed = 0;
  for (const [x, y] of pts) {
    const yid = comp.get(y);
    const ge = processed - bitSum(yid - 1);
    ans += ge;
    bitUpdate(yid);
    processed++;
  }
  out.push(ans);
}

console.log(out.join("\n"));
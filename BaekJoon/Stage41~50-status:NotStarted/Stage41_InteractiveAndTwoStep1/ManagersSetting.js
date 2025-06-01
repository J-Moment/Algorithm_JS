const fs = require("fs");

const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);
let idx = 0;
const M = data[idx++];
const N = data[idx++];
const Q = data[idx++];
const v = data.slice(idx, idx + N);

const queries = [];
for (let i = 1; i <= M; i++) {
  queries.push(`? ${i} ${i}`);
}
process.stdout.write(queries.join("\n") + "\n");

const respLines = fs.readFileSync(0, "utf8").trim().split(/\s+/);

const ans = new Array(N);
for (let i = 1; i <= M; i++) {
  const ch = parseInt(respLines[i - 1], 10);
  if (ch === 1) {
    ans[i - 1] = v[i - 1];
  } else {
    ans[i - 1] = ch - 1;
  }
}

for (let k = M; k < N; k++) {
  ans[k] = v[k];
}

process.stdout.write(`! ${ans.join(" ")}\n`);
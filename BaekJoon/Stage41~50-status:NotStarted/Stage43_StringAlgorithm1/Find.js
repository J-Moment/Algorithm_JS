const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filepath, "utf8");
const [text, pattern] = input.split(/\r?\n/, 2);

function buildLPS(p) {
  const n = p.length;
  const lps = Array(n).fill(0);
  let len = 0;
  for (let i = 1; i < n; ) {
    if (p[i] === p[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}

function kmpSearch(t, p) {
  const lps = buildLPS(p);
  const res = [];
  let i = 0, j = 0;
  const N = t.length, M = p.length;
  while (i < N) {
    if (t[i] === p[j]) {
      i++; j++;
      if (j === M) {
        res.push(i - M + 1);
        j = lps[j - 1];
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return res;
}

const positions = kmpSearch(text, pattern);

console.log(positions.length);
console.log(positions.join(" "));
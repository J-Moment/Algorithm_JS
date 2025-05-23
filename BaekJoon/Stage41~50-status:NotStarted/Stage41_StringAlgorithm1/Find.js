const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const lines = fs.readFileSync(filepath, "utf8").split(/\r?\n/);
const pattern = lines[0];
const text = lines[1];

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
  let i = 0,
    j = 0;
  while (i < t.length) {
    if (t[i] === p[j]) {
      i++;
      j++;
      if (j === p.length) {
        res.push(i - j + 1);
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
if (positions.length > 0) {
  console.log(positions.join(" "));
}
const fs = require("fs");
const data = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");
let idx = 0;

while (idx < data.length) {
  const N = Number(data[idx++]);
  if (isNaN(N)) break;

  class Node {
    constructor() {
      this.children = new Map();
      this.isEnd = false;
      this.childCount = 0;
    }
  }

  const root = new Node();

  const words = [];
  for (let i = 0; i < N; i++, idx++) {
    const w = data[idx];
    words.push(w);
    let cur = root;
    for (const ch of w) {
      if (!cur.children.has(ch)) {
        cur.children.set(ch, new Node());
        cur.childCount++;
      }
      cur = cur.children.get(ch);
    }
    cur.isEnd = true;
  }

  let total = 0;
  for (const w of words) {
    let cur = root;
    total++;
    cur = cur.children.get(w[0]);
    for (let i = 1; i < w.length; i++) {
      if (cur.isEnd || cur.childCount > 1) {
        total++;
      }
      cur = cur.children.get(w[i]);
    }
  }

  const avg = total / N;
  console.log(avg.toFixed(2));
}
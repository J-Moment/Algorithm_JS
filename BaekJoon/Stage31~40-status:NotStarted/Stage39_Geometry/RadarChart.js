const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const a = fs.readFileSync(filepath, "utf8").trim().split(/\s+/).map(Number);

const sqrt2over2 = Math.SQRT2 / 2;

const dx = [1, sqrt2over2, 0, -sqrt2over2, -1, -sqrt2over2, 0, sqrt2over2];
const dy = [0, sqrt2over2, 1, sqrt2over2, 0, -sqrt2over2, -1, -sqrt2over2];

let count = 0;
const perm = new Array(8);
const used = new Array(8).fill(false);
const Px = new Array(8);
const Py = new Array(8);

function dfs(depth) {
  if (depth === 8) {
    for (let k = 0; k < 8; k++) {
      const v = a[perm[k]];
      Px[k] = v * dx[k];
      Py[k] = v * dy[k];
    }

    for (let k = 0; k < 8; k++) {
      const x1 = Px[k],
        y1 = Py[k];
      const x2 = Px[(k + 1) % 8],
        y2 = Py[(k + 1) % 8];
      const x3 = Px[(k + 2) % 8],
        y3 = Py[(k + 2) % 8];
      const cross = (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2);
      if (cross <= 0) return;
    }
    count++;
    return;
  }

  for (let i = 0; i < 8; i++) {
    if (!used[i]) {
      used[i] = true;
      perm[depth] = i;
      dfs(depth + 1);
      used[i] = false;
    }
  }
}

dfs(0);
console.log(count);
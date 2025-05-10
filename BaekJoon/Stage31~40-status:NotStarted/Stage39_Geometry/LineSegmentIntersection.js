const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split(/\s+/);

const [x1, y1, x2, y2, x3, y3, x4, y4] = input.map(BigInt);

function ccw(ax, ay, bx, by, cx, cy) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}

const cond1 = ccw(x1, y1, x2, y2, x3, y3) * ccw(x1, y1, x2, y2, x4, y4);
const cond2 = ccw(x3, y3, x4, y4, x1, y1) * ccw(x3, y3, x4, y4, x2, y2);

console.log(cond1 < 0n && cond2 < 0n ? 1 : 0);
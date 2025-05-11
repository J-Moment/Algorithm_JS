const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split(/\s+/);

const [x1, y1, x2, y2, x3, y3, x4, y4] = input.map(BigInt);

function ccw(ax, ay, bx, by, cx, cy) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}

function exceptionCheck(ax, ay, bx, by, cx, cy) {
  const inX = (ax <= cx && cx <= bx) || (bx <= cx && cx <= ax);
  const inY = (ay <= cy && cy <= by) || (by <= cy && cy <= ay);
  return inX && inY;
}

const d1 = ccw(x1, y1, x2, y2, x3, y3);
const d2 = ccw(x1, y1, x2, y2, x4, y4);
const d3 = ccw(x3, y3, x4, y4, x1, y1);
const d4 = ccw(x3, y3, x4, y4, x2, y2);

let result = 0;

//교차 하였을 경우
if (d1 * d2 < 0n && d3 * d4 < 0n) {
  result = 1;
}
//점에 걸쳐졌을 경우
else if (d1 === 0n && exceptionCheck(x1, y1, x2, y2, x3, y3)) {
  result = 1;
} else if (d2 === 0n && exceptionCheck(x1, y1, x2, y2, x4, y4)) {
  result = 1;
} else if (d3 === 0n && exceptionCheck(x3, y3, x4, y4, x1, y1)) {
  result = 1;
} else if (d4 === 0n && exceptionCheck(x3, y3, x4, y4, x2, y2)) {
  result = 1;
}

console.log(result);
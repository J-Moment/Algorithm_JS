const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split(/\s+/);

const [x1, y1, x2, y2, x3, y3, x4, y4] = input.map(Number);

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

let intersect = false;
let singlePoint = false;
let ix = 0, iy = 0;

//교차 하였을 경우
if (d1 * d2 < 0 && d3 * d4 < 0) {
  intersect = singlePoint = true;
}
//점에 걸쳐졌을 경우
else if (d1 === 0 && exceptionCheck(x1, y1, x2, y2, x3, y3)) {
  intersect = singlePoint = true; ix = x3; iy = y3;
}
else if (d2 === 0 && exceptionCheck(x1, y1, x2, y2, x4, y4)) {
  intersect = singlePoint = true; ix = x4; iy = y4;
}
else if (d3 === 0 && exceptionCheck(x3, y3, x4, y4, x1, y1)) {
  intersect = singlePoint = true; ix = x1; iy = y1;
}
else if (d4 === 0 && exceptionCheck(x3, y3, x4, y4, x2, y2)) {
  intersect = singlePoint = true; ix = x2; iy = y2;
}

else if (d1 === 0 && d2 === 0 && d3 === 0 && d4 === 0) {
  const pts = [];
  if (exceptionCheck(x1, y1, x2, y2, x3, y3)) pts.push([x3, y3]);
  if (exceptionCheck(x1, y1, x2, y2, x4, y4)) pts.push([x4, y4]);
  if (exceptionCheck(x3, y3, x4, y4, x1, y1)) pts.push([x1, y1]);
  if (exceptionCheck(x3, y3, x4, y4, x2, y2)) pts.push([x2, y2]);
  if (pts.length) {
    intersect = true;
    const uniq = [];
    for (const p of pts) {
      if (!uniq.some(q => q[0] === p[0] && q[1] === p[1])) uniq.push(p);
    }
    if (uniq.length === 1) {
      singlePoint = true;
      [ix, iy] = uniq[0];
    }
  }
}

console.log((intersect ? 1 : 0));

if (intersect && singlePoint) {
  if (d1 * d2 < 0 && d3 * d4 < 0) {
    const rX = x2 - x1, rY = y2 - y1;
    const sX = x4 - x3, sY = y4 - y3;
    const denom = rX * sY - rY * sX;
    const t = ((x3 - x1) * sY - (y3 - y1) * sX) / denom;
    ix = x1 + rX * t;
    iy = y1 + rY * t;
  }
  console.log(ix + " " + iy);
}
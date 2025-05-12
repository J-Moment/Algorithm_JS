const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [x1, y1, r1, x2, y2, r2] = input[0].split(" ").map(Number);

// 두 원의 중심 사이의 거리 계산
const d = Math.hypot(x1 - x2, y1 - y2);
let area;

// 겹치지 않았을 경우
if (d >= r1 + r2) {
  area = 0;
}

// 한 원이 다른 원에 포함되는 경우
else if (d <= Math.abs(r1 - r2)) {
  const r = Math.min(r1, r2);
  area = Math.PI * r * r;
}

// 두 원이 일부만 겹치는 경우
else {
// 두 원의 중심으로부터 접점까지의 부채꼴의 합 - 두 원의 중심으로부터 접점까지의 삼각형들의 면적
  const doubleR1 = r1 * r1, doubleR2 = r2 * r2;
  const theta1 = 2 * Math.acos((d*d + doubleR1 - doubleR2) / (2 * d * r1));
  const theta2  = 2 * Math.acos((d*d + doubleR2 - doubleR1) / (2 * d * r2));
  const area1 = 0.5 * doubleR1 * (theta1 - Math.sin(theta1));
  const area2 = 0.5 * doubleR2 * (theta2  - Math.sin(theta2));
  area = area1 + area2;
}

console.log(area.toFixed(3));
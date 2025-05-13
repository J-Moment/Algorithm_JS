const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [x, y, D, T] = input[0].split(" ").map(Number);
const dist = Math.hypot(x, y);

// 걷는게 유리할 경우
let ans = dist;

// 점프를 할 경우
if (T < D) {
  const n = Math.floor(dist / D);
  // 점프 이후 남은거리 걷기
  ans = Math.min(ans, n * T + (dist - n * D));
  // 점프 이후 초과한 거리 걷기
  ans = Math.min(ans, (n + 1) * T + (n + 1) * D - dist);

  // 예외 케이스 => 방향을 꺾으며 점프로 도착
  if (n > 0) {
    ans = Math.min(ans, (n + 1) * T);
  }
  // 예외 케이스 => 방향을 꺾으며 두 번 점프로 도착
  else {
    ans = Math.min(ans, 2 * T);
  }
}

console.log(ans);
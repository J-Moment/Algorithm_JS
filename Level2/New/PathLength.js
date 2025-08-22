function solution(dirs) {
  const directions = { U: [0, 1], D: [0, -1], R: [1, 0], L: [-1, 0] };
  let curPos = [0, 0];
  const visited = new Set();

  for (let dir of dirs) {
    let [dx, dy] = directions[dir];
    let [nx, ny] = [curPos[0] + dx, curPos[1] + dy];

    if (nx < -5 || nx > 5 || ny < -5 || ny > 5) continue;

    visited.add(`${curPos[0]},${curPos[1]},${nx},${ny}`);
    visited.add(`${nx},${ny},${curPos[0]},${curPos[1]}`);

    curPos = [nx, ny];
  }

  return visited.size / 2;
}
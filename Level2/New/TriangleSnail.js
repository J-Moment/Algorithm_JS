function solution(n) {
  const snail = Array.from(new Array(n), () => new Array(n).fill(0));
  const dir = [
    [1, 0],
    [0, 1],
    [-1, -1],
  ];
  let x = -1;
  let y = 0;
  let num = 1;
  for (let i = n; i > 0; i--) {
    const d = (n - i) % 3;
    for (let j = 0; j < i; j++) {
      x += dir[d][0];
      y += dir[d][1];
      snail[x][y] = num;
      num++;
    }
  }

  return snail.flatMap((arr) => arr.filter((val) => val !== 0));
}
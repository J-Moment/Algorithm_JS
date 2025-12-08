/**
 * @param {number} n
 * @return {number}
 */
var countTriples = function (n) {
  const squares = new Set();
  for (let c = 1; c <= n; c++) {
    squares.add(c * c);
  }

  let answer = 0;
  const maxSquare = n * n;

  for (let a = 1; a <= n; a++) {
    const aa = a * a;
    for (let b = 1; b <= n; b++) {
      const sum = aa + b * b;
      if (sum > maxSquare) continue;
      if (squares.has(sum)) {
        answer++;
      }
    }
  }

  return answer;
};

function solution(arr) {
  const n = arr.length;
  const answer = [0, 0];

  function checkSame(x, y, size) {
    const v = arr[y][x];
    for (let i = y; i < y + size; i++) {
      for (let j = x; j < x + size; j++) {
        if (arr[i][j] !== v) return -1;
      }
    }
    return v;
  }

  function quad(x, y, size) {
    const u = checkSame(x, y, size);
    if (u !== -1) {
      answer[u] += 1;
      return;
    }

    const half = size >> 1;
    quad(x, y, half);
    quad(x + half, y, half);
    quad(x, y + half, half);
    quad(x + half, y + half, half);
  }

  quad(0, 0, n);
  return answer;
}
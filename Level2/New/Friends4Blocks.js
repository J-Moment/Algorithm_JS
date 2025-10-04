function solution(m, n, board) {
  const grid = board.map((row) => row.split(""));
  let removed = 0;

  while (true) {
    const mark = Array.from({ length: m }, () => Array(n).fill(false));
    let found = false;

    for (let r = 0; r < m - 1; r++) {
      for (let c = 0; c < n - 1; c++) {
        const ch = grid[r][c];
        if (!ch) continue;
        if (
          ch === grid[r][c + 1] &&
          ch === grid[r + 1][c] &&
          ch === grid[r + 1][c + 1]
        ) {
          mark[r][c] =
            mark[r][c + 1] =
            mark[r + 1][c] =
            mark[r + 1][c + 1] =
              true;
          found = true;
        }
      }
    }

    if (!found) break;

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (mark[r][c]) {
          grid[r][c] = null;
          removed++;
        }
      }
    }

    for (let c = 0; c < n; c++) {
      let write = m - 1;
      for (let r = m - 1; r >= 0; r--) {
        if (grid[r][c] != null) {
          grid[write][c] = grid[r][c];
          if (write !== r) grid[r][c] = null;
          write--;
        }
      }
      for (let r = write; r >= 0; r--) grid[r][c] = null;
    }
  }
  return removed;
}
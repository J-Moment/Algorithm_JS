/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  const n = strs.length;
  const m = strs[0].length;

  let dp = new Array(m).fill(1);
  let maxKeep = 1;

  for (let j = 1; j < m; j++) {
    for (let i = 0; i < j; i++) {
      let canKeep = true;

      for (let k = 0; k < n; k++) {
        if (strs[k][i] > strs[k][j]) {
          canKeep = false;
          break;
        }
      }

      if (canKeep) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
      }
    }
    maxKeep = Math.max(maxKeep, dp[j]);
  }

  return m - maxKeep;
};

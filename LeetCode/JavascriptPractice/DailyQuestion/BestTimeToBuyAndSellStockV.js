/**
 * @param {number[]} prices
 * @param {number} k
 * @return {number}
 */
var maximumProfit = function (prices, k) {
  const n = prices.length;
  if (n === 0 || k === 0) return 0;

  const dp = Array.from({ length: k + 1 }, () => Array(n).fill(0));

  for (let t = 1; t <= k; t++) {
    let maxDiffLong = -prices[0];
    let maxDiffShort = prices[0];

    for (let i = 1; i < n; i++) {
      dp[t][i] = Math.max(
        dp[t][i - 1],
        prices[i] + maxDiffLong,
        maxDiffShort - prices[i]
      );

      maxDiffLong = Math.max(maxDiffLong, dp[t - 1][i - 1] - prices[i]);
      maxDiffShort = Math.max(maxDiffShort, dp[t - 1][i - 1] + prices[i]);
    }
  }

  return dp[k][n - 1];
};

/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function (prices, strategy, k) {
  const n = prices.length;
  const half = k / 2;

  let base = 0;
  for (let i = 0; i < n; i++) {
    base += strategy[i] * prices[i];
  }

  const frontDelta = new Array(n);
  const backDelta = new Array(n);

  for (let i = 0; i < n; i++) {
    frontDelta[i] = -strategy[i] * prices[i];
    backDelta[i] = (1 - strategy[i]) * prices[i];
  }

  let frontSum = 0;
  let backSum = 0;

  for (let i = 0; i < half; i++) frontSum += frontDelta[i];
  for (let i = half; i < k; i++) backSum += backDelta[i];

  let maxDelta = 0;

  maxDelta = Math.max(maxDelta, frontSum + backSum);

  for (let l = 1; l + k <= n; l++) {
    frontSum -= frontDelta[l - 1];
    frontSum += frontDelta[l + half - 1];

    backSum -= backDelta[l + half - 1];
    backSum += backDelta[l + k - 1];

    maxDelta = Math.max(maxDelta, frontSum + backSum);
  }

  return base + maxDelta;
};

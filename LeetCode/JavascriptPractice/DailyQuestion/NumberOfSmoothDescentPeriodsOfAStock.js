/**
 * @param {number[]} prices
 * @return {number}
 */
var getDescentPeriods = function (prices) {
  let total = 1;
  let streak = 1;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] === prices[i - 1] - 1) {
      streak++;
    } else {
      streak = 1;
    }
    total += streak;
  }

  return total;
};

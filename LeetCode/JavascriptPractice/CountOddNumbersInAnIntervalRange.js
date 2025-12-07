/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function (low, high) {
  const countOdd = (n) => Math.floor((n + 1) / 2);
  return countOdd(high) - countOdd(low - 1);
};

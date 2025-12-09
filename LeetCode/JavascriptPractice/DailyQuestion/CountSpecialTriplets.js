/**
 * @param {number[]} nums
 * @return {number}
 */
var specialTriplets = function (nums) {
  const mod = 1000000007;

  const right = new Map();
  for (const x of nums) {
    right.set(x, (right.get(x) || 0) + 1);
  }

  const left = new Map();
  let ans = 0;

  for (const x of nums) {
    right.set(x, right.get(x) - 1);
    if (right.get(x) === 0) right.delete(x);

    const target = x * 2;

    const leftCount = left.get(target) || 0;
    const rightCount = right.get(target) || 0;

    ans = (ans + leftCount * rightCount) % mod;

    left.set(x, (left.get(x) || 0) + 1);
  }

  return ans;
};

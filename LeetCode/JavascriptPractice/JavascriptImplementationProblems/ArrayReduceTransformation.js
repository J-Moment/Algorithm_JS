/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
  let cur = init;
  for (let num of nums) {
    cur = fn(cur, num);
  }
  return cur;
};

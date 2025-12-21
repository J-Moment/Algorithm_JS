/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  const n = strs.length;
  const m = strs[0].length;
  let deleteCount = 0;

  let isSorted = new Array(n - 1).fill(false);

  for (let col = 0; col < m; col++) {
    let canKeep = true;

    for (let row = 0; row < n - 1; row++) {
      if (!isSorted[row] && strs[row][col] > strs[row + 1][col]) {
        canKeep = false;
        break;
      }
    }

    if (canKeep) {
      for (let row = 0; row < n - 1; row++) {
        if (strs[row][col] < strs[row + 1][col]) {
          isSorted[row] = true;
        }
      }
    } else {
      deleteCount++;
    }
  }

  return deleteCount;
};

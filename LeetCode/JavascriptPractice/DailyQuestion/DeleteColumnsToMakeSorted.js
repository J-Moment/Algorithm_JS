/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  let deleteCount = 0;
  const rowCount = strs.length;
  const colCount = strs[0].length;

  for (let col = 0; col < colCount; col++) {
    for (let row = 0; row < rowCount - 1; row++) {
      if (strs[row][col] > strs[row + 1][col]) {
        deleteCount++;
        break;
      }
    }
  }

  return deleteCount;
};

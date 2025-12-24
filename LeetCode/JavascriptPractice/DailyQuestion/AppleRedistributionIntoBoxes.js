/**
 * @param {number[]} apple
 * @param {number[]} capacity
 * @return {number}
 */
var minimumBoxes = function (apple, capacity) {
  let totalApples = apple.reduce((sum, val) => sum + val, 0);

  capacity.sort((a, b) => b - a);

  let boxesUsed = 0;

  for (let i = 0; i < capacity.length; i++) {
    totalApples -= capacity[i];
    boxesUsed++;

    if (totalApples <= 0) {
      break;
    }
  }

  return boxesUsed;
};

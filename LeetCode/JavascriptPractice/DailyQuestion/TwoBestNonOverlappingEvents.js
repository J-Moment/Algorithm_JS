/**
 * @param {number[][]} events
 * @return {number}
 */
var maxTwoEvents = function (events) {
  const n = events.length;

  events.sort((a, b) => a[0] - b[0]);

  let suffixMax = new Array(n);
  suffixMax[n - 1] = events[n - 1][2];
  for (let i = n - 2; i >= 0; i--) {
    suffixMax[i] = Math.max(events[i][2], suffixMax[i + 1]);
  }

  let maxTotalValue = 0;

  for (let i = 0; i < n; i++) {
    const [start, end, value] = events[i];

    maxTotalValue = Math.max(maxTotalValue, value);

    let left = i + 1,
      right = n - 1;
    let nextIdx = -1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (events[mid][0] > end) {
        nextIdx = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    if (nextIdx !== -1) {
      maxTotalValue = Math.max(maxTotalValue, value + suffixMax[nextIdx]);
    }
  }

  return maxTotalValue;
};

function solution(sequence, k) {
  let left = 0;
  let sum = 0;

  let bestL = 0,
    bestR = 0;
  let bestLen = Infinity;

  for (let right = 0; right < sequence.length; right++) {
    sum += sequence[right];

    while (sum >= k) {
      if (sum === k) {
        const len = right - left + 1;
        if (len < bestLen || (len === bestLen && left < bestL)) {
          bestLen = len;
          bestL = left;
          bestR = right;
        }
      }
      sum -= sequence[left++];
    }
  }

  return [bestL, bestR];
}

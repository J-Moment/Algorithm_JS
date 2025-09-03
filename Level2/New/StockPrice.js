function solution(prices) {
  var answer = [];
  let seconds;

  for (let i = 0; i < prices.length; i++) {
    seconds = 0;
    for (let j = i + 1; j < prices.length; j++) {
      seconds++;
      if (prices[i] > prices[j]) {
        break;
      }
    }
    answer.push(seconds);
  }
  return answer;
}
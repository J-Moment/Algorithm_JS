function solution(storey) {
  let n = storey;
  let answer = 0;

  while (n > 0) {
    const d = n % 10;
    const next = Math.floor(n / 10) % 10;

    if (d < 5) {
      answer += d;
      n -= d;
    } else if (d > 5) {
      answer += 10 - d;
      n += 10 - d;
    } else {
      if (next >= 5) {
        answer += 5;
        n += 5;
      } else {
        answer += 5;
        n -= 5;
      }
    }

    n = Math.floor(n / 10);
  }

  return answer;
}
function solution(numbers, target) {
  let answer = 0;
  let end = numbers.length;

  let q = [[0, 0]];
  let head = 0;

  while (head < q.length) {
    let [value, level] = q[head++];

    if (level === end) {
      if (value === target) answer++;
      continue;
    }

    q.push([value - numbers[level], level + 1]);
    q.push([value + numbers[level], level + 1]);
  }

  return answer;
}
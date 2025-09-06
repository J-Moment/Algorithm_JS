function solution(order) {
  let answer = 0;
  let stack = [];

  // orderlist의 index => 택배 순서
  let idx = 0;
  // 영재의 순서
  let num = 1;

  while (num <= order.length) {
    if (order[idx] === num) {
      answer++;
      idx++;
      num++;
    } else {
      stack.push(num++);
    }
    while (stack.length && stack[stack.length - 1] === order[idx]) {
      stack.pop();
      answer++;
      idx++;
    }
  }

  return answer;
}
function solution(order) {
    let idx = 0;
    const stack = [];
    for (let i = 1; i <= order.length; i++) {
      stack.push(i);
      while (stack.length > 0 && stack[stack.length - 1] === order[idx]) {
        stack.pop();
        idx++;
      }
    }
    return idx;
}
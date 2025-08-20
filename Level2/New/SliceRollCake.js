function solution(topping) {
  const right = new Map();
  for (const t of topping) right.set(t, (right.get(t) || 0) + 1);

  const left = new Set();
  let rightKinds = right.size;
  let answer = 0;

  for (let i = 0; i < topping.length - 1; i++) {
    const t = topping[i];

    left.add(t);
    const cnt = right.get(t);
    if (cnt === 1) {
      right.delete(t);
      rightKinds--;
    } else {
      right.set(t, cnt - 1);
    }

    if (left.size === rightKinds) answer++;
  }
  return answer;
}
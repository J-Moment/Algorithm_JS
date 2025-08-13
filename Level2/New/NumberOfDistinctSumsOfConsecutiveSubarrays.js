function solution(elements) {
  const circle = elements.concat(elements);
  const set = new Set();
  for (let i = 0; i < elements.length; i++) {
    let sum = 0;
    for (let j = 0; j < elements.length; j++) {
      sum += circle[i + j];
      set.add(sum);
    }
  }
  return set.size;
}
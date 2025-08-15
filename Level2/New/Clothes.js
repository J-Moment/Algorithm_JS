function solution(clothes) {
  let map = new Map();

  for (let [item, category] of clothes) {
    map.set(category, (map.get(category) || 0) + 1);
  }

  var answer = 1;

  for (let cnt of map.values()) {
    answer *= cnt + 1;
  }
  return answer - 1;
}
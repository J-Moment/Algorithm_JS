function solution(s) {
  var answer = [];
  let str = s
    .slice(2, -2)
    .split("},{")
    .sort((a, b) => a.length - b.length);

  str.forEach((v) => {
    let tuple = v.split(",");
    answer.push(tuple.find((num) => !answer.includes(num)));
  });
  return answer.map(Number);
}
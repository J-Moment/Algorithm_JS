function solution(msg) {
  let answer = [];
  let dict = {};
  let idx = 1;

  for (let i = 65; i <= 90; i++) {
    dict[String.fromCharCode(i)] = idx++;
  }

  let w = "";
  for (let i = 0; i < msg.length; i++) {
    let c = msg[i];
    if (dict[w + c]) {
      w = w + c;
    } else {
      answer.push(dict[w]);
      dict[w + c] = idx++;
      w = c;
    }
  }
  answer.push(dict[w]);
  return answer;
}
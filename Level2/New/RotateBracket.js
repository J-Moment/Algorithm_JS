function solution(s) {
  var answer = 0;

  if (isValid(s)) {
    answer++;
  }
  for (let x = 0; x < s.length - 1; x++) {
    s = s.substring(1, s.length) + s.substring(0, 1);
    if (isValid(s)) {
      answer++;
    }
  }

  return answer;
}

const isValid = (str) => {
  const stack = [];
  const pair = { ")": "(", "]": "[", "}": "{" };

  for (let ch of str) {
    if (["(", "[", "{"].includes(ch)) {
      stack.push(ch);
    } else {
      if (stack.pop() !== pair[ch]) return false;
    }
  }
  if (stack.length) {
    return false;
  }
  return true;
};
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

for (let i = 0; i < input.length-1; i++) {
  let ans = "yes";
  let str = input[i];
  let stack = [];

  for (let j = 0; j < str.length; j++) {
    switch (str[j]) {
      case "(":
        stack.push("(");
        break;
      case "[":
        stack.push("[");
        break;
      case ")":
        if (stack.length > 0 && stack[stack.length - 1] === "(") stack.pop();
        else ans = "no";
        break;
      case "]":
        if (stack.length > 0 && stack[stack.length - 1] === "[") stack.pop();
        else ans = "no";
        break;
      default:
        continue;
    }
  }
  if (stack.length !== 0) ans = "no";
  console.log(ans);
}
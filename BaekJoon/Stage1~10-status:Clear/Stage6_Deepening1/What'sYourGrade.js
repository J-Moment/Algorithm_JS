const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().split("\n");

let subject = 0;
let sum = 0;
for (let i = 0; i < 20; i++) {
  let [grade, score] = input[i].split(" ").slice(1);
  grade = Number(grade);
  subject += grade;

  switch (score) {
    case "A+":
      sum += grade * 4.5;
      break;
    case "A0":
      sum += grade * 4.0;
      break;
    case "B+":
      sum += grade * 3.5;
      break;
    case "B0":
      sum += grade * 3.0;
      break;
    case "C+":
      sum += grade * 2.5;
      break;
    case "C0":
      sum += grade * 2.0;
      break;
    case "D+":
      sum += grade * 1.5;
      break;
    case "D0":
      sum += grade * 1.0;
      break;
    case "P":
      subject -= grade;
      break;
    case "F":
      sum += 0;
      break;
  }
}

console.log(sum / subject);

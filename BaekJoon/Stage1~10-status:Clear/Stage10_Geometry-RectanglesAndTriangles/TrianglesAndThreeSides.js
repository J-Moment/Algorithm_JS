const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

for(let i = 0 ; i < input.length-1; i++){
    let threeSides = input[i].split(' ').map(Number);

    if(threeSides[0] === threeSides[1] && threeSides[1] === threeSides[2]) console.log("Equilateral");
    else if(threeSides[0] + threeSides[1] <= threeSides[2] || threeSides[0] + threeSides[2] <= threeSides[1] || threeSides[1] + threeSides[2] <= threeSides[0]) console.log("Invalid");
    else if(threeSides[0] === threeSides[1] || threeSides[1] === threeSides[2] || threeSides[0] === threeSides[2]) console.log("Isosceles");
    else console.log("Scalene");
}
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

let N = +input[0];
let answer = "";

function makeStar(i, j){
    if(i%3 == 1 && j%3 == 1){
        answer += " ";
    }else{
        if(Math.floor(i / 3) == 0 && Math.floor(j / 3) == 0){
            answer += "*";
        } else {
            makeStar(Math.floor(i / 3), Math.floor(j / 3));
        }
    }
}

for(let i=0; i<N; i++){
    for(let j=0; j<N; j++){
        makeStar(i,j);
    }
    answer += "\n";
}

console.log(answer);
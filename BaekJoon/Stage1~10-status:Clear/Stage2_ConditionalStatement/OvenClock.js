function solution(a , b, t) {
    h = Math.floor((a * 60 + b + t) / 60);
    m = (a * 60 + b + t) % 60;
    if (h >= 24) {
      h -= 24;
    }
    console.log(`${h} ${m}`);
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let input = [];
let arr = [];
rl.on("line", function(line){
    input.push(line);
    arr = input[0].split(' ').map((el) => parseInt(el));
    arr.push(parseInt(input[1]));
}).on("close", function(){
    let A = arr[0];
    let B = arr[1];
    let T = arr[2];
    solution(A, B, T);
    process.exit();
})
function solution(A , B, C){
    console.log((A+B)%C);
    console.log(((A%C) + (B%C))%C);
    console.log((A*B)%C);
    console.log(((A%C) * (B%C))%C);
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let input = [];
rl.on("line", function(line){
    input = line.split(' ').map((el) => parseInt(el));
    rl.close();
}).on("close", function(){
    let A = input[0];
    let B = input[1];
    let C = input[2];
    solution(A, B, C);
    process.exit();
})
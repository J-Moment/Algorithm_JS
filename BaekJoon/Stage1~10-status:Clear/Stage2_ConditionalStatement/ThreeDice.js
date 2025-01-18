function solution(A, B, C){
    if (A === B && A === C) {
        console.log(10000 + A * 1000);
    } else if (A === B && B !== C) {
        console.log(1000 + A * 100);
    } else if (B === C && C !== A) {
        console.log(1000 + B * 100);
    } else if (C === A && A !== B) {
        console.log(1000 + C * 100);
    } else {
        console.log(A*100);
    }
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
    const [A, B, C] = input.sort((a, b) => b - a);
    solution(A, B, C);
    process.exit();
})
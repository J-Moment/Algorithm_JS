function solution(a , b){
    if(a > b) {
        console.log(">");
    }
    else if(a < b) {
        console.log("<");
    }
    else if (a === b) {
        console.log("==");
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
    let A = input[0];
    let B = input[1];
    solution(A, B);
    process.exit();
})
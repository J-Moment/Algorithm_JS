function solution(a , b){
    if(b >= 45) {
        console.log(`${a} ${b-45}`);
    } else {
        if(a > 0) {
            console.log(`${a-1} ${b+15}`);
        }
        else {
            console.log(`23 ${b+15}`);
        }
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
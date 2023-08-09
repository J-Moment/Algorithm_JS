function solution(){
    console.log("Hello World!");
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on("line", function(line){
    rl.close();
}).on("close", function(){
    solution();
    process.exit();
})
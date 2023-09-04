function solution(num) {
    let str = "";
    for(let i = 0 ; i < num ; i++) {
        str += "long ";
    }
    str += "int";
    console.log(str);
}

const readline = require('readline');
let input;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
    input = parseInt(line)/4;
    rl.close();
}).on("close", function() {
    solution(input);
    process.exit();
});
function solution(num) {
    for(let i=1; i < num; i++){
        let blank = ' '.repeat( (num-i) );
        let stars = '*'.repeat( i+(i-1) );
        console.log( blank + stars );
    }

    for(let j=num; j > 0; j--) {
        let blank = ' '.repeat( (num-j) );
        let stars = '*'.repeat( j+(j-1) );
        console.log( blank + stars );
    }
}

const readline = require('readline');
let input;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
    input = parseInt(line);
    rl.close();
}).on("close", function() {
    solution(input);
    process.exit();
});
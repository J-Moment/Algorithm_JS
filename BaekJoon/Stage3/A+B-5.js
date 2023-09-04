const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

while (input[0][0] != 0) {
    const numbers = input.shift().split(" ");
    
    console.log(+numbers[0] + +numbers[1]);
}
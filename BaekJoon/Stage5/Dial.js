function solution (str) {
    let phone = {
        2: "ABC",
        3: "DEF",
        4: "GHI",
        5: "JKL",
        6: "MNO",
        7: "PQRS",
        8: "TUV",
        9: "WXYZ",
    };
    let result = 0;
    
    for (let i = 0; i < str.length; i++) {
        for (let j = 2; j <= 9; j++) {
            if (phone[j].includes(str[i])) {
                result += j + 1;
                break;
            }
        }
    }
    console.log(result);
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function(line) {
  input.push(line)
  rl.close();
}).on("close", function() {
    solution(input[0].toString());
  process.exit();
});
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let S = input[0];
let bomb = input[1];

const stack = [];
const bombLength = bomb.length;

for (let i = 0; i < S.length; i++) {
    stack.push(S[i]);

    if (stack.length >= bombLength) {
        let isBomb = true;
        for (let j = 0; j < bombLength; j++) {
            if (stack[stack.length - bombLength + j] !== bomb[j]) {
                isBomb = false;
                break;
            }
        }

        if (isBomb) {
            for (let j = 0; j < bombLength; j++) {
                stack.pop();
            }
        }
    }
}

const result = stack.join('');
console.log(result === '' ? 'FRULA' : result);
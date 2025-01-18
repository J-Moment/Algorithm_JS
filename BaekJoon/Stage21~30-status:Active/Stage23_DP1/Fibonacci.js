const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

const solution = (num) => {
    let recursionCnt= 0, dpTimes = 0;

    const recursion = (inputNum) => {
        if(inputNum === 1 || inputNum === 2) {
            recursionCnt++;
            return 1;
        } else {
            return recursion(inputNum-1) + recursion(inputNum-2);
        }
    }

    const dp = (inputNum) => {
        let answerArr = [1, 1];

        for(let i = 2 ; i < num ; i++) {
            answerArr.push(+answerArr[i - 1] + answerArr[i - 2]);
            dpTimes++;
        }
        return answerArr[inputNum-1]
    }
    recursion(num);
    dp(num);

    console.log(recursionCnt, dpTimes);
}

solution(+input[0]);
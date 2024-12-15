const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

let N = +input[0];
let cnt = 0;
const checkWord = (word) => {
    let cv = true;
    let arr = [];
    arr.push(word[0]);
    for (let t = 1 ; t < word.length; t++){
        if (word[t] !== word[t-1]) {
            if (arr.includes(word[t])) {
                cv = false;
                break;
            } else {
                arr.push(word[t]);
            }
        }
    }

    return cv;
}

for(let i = 1 ; i <= N ; i++){
    let word = input[i];
    if(checkWord(word) === true) cnt++;
}

console.log(cnt);
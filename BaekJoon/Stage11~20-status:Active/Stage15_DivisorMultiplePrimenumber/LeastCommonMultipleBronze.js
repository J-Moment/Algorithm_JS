const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let T = Number(input[0]);
let ans = [];

for(let i = 1 ; i <= T ; i++) {
    let [a, b] = input[i].split(" ").map(Number);
    let originalA = a;
    let originalB = b;

    while(a % b !== 0){
        let r = a % b;

        if(r !== 0) {
            a = b;
            b = r;
        }
    }

    let min = originalA * originalB / b;
    ans.push(min);
}

console.log(ans.join("\n"));
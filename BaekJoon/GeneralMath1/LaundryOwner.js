const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let T = +input[0];
let changeList = [Quarter, Dime, Nickel, Penny] = [25, 10, 5, 1];
let changes;
let ans;
for(let i = 1 ; i <= T ; i++){
    changes = +input[i];
    ans = [];
    for(let j = 0 ; j < 4 ; j++) {
        let value = Math.floor(changes/changeList[j]);
        changes = changes % changeList[j];

        ans.push(value);
    }
    console.log(ans.join(" "));
}
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let dict = new Map();

for(let i = 1 ; i <= N ; i++){
    let word = input[i];
    if(word.length >= M) dict.set(word, (dict.get(word)||0) + 1);
}

dict = [...dict].sort((a,b)=>{
    if (a[1]===b[1]) {
        if (a[0].length === b[0].length) {
            return a[0] < b[0] ? -1 : 1;
        } else {
            return b[0].length-a[0].length;
        }
    } else {
        return b[1]-a[1];
    }
}).map(v=>v[0]);

console.log(dict.join("\n"));
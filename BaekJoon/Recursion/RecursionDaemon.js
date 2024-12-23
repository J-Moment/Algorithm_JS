const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = +input[0];
let S;

const recurrsion = (str, l, r, cnt) => {
    if(l >= r) return [1, cnt+1];
    else if(str[l] !== str[r]) return [0, cnt+1];
    else return recurrsion(str, l+1, r-1, cnt+1);
}

const isPalindrome = (str) => {
    return recurrsion(str, 0, str.length-1, 0);
}

for(let i = 1 ; i <= N; i++){
    S = input[i];
    console.log(isPalindrome(S).join(" "));
}
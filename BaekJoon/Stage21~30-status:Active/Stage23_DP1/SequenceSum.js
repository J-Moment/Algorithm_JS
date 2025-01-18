const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

let tc = +input[0];
let li = input[1].split(' ').map(Number);
var dp = [li[0]];
for(var i=1; i<tc; i++){
    dp[i] = li[i] > li[i] + dp[i-1] ? li[i] : li[i] + dp[i-1];
}
console.log(Math.max(...dp));
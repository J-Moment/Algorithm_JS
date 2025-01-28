const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let Nlist = new Set();
for(let i = 1 ; i <= N ; i++){
    Nlist.add(input[i]);
}

let ans = 0;

for(let i = N+1 ; i <= N+M+1 ; i++){
    if(Nlist.has(input[i])) ans++;
}
console.log(ans);
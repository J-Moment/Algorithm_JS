const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let unSeenSet = new Set()
let ans = [];

for (let i = 1 ; i <= N ; i++){
    unSeenSet.add(input[i])
}

for(let i = N+1; i<= N+M; i++){
    let name = input[i].trim();
    if(unSeenSet.has(name)) ans.push(name);
}
ans.sort();
console.log(ans.length);
console.log(ans.join("\n"));
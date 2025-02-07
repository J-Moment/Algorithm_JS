const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let li = [];
for(let i = 1 ; i<=N ; i++){
    li.push(input[i].split(" "));
}

let company = new Map(li.map((el) => [el[0], el[1]]));
let result = [];

for (let key of company.keys()) {
	if (company.get(key) !== "leave") result.push(key);
}

result.sort().reverse();

console.log(result.join('\n'));
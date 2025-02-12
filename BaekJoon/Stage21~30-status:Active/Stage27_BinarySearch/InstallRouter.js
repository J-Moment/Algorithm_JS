let fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let [N, C] = input[0].split(" ").map(Number);

let houseList = [];

for(let i = 1 ; i <= N ; i++){
    houseList.push(Number(input[i]));
}

houseList.sort((a, b) => a - b);
let start = 1;
let end = houseList[houseList.length - 1];

while (start <= end) {
    const mid = Math.floor((start + end) / 2);
  
    let count = 1;
    let prev = houseList[0];
    for (const cur of houseList) {
      if (cur - prev < mid) continue;
      prev = cur;
      count += 1;
    }
  
    if (count < C) end = mid - 1;
    else start = mid + 1;
  }
console.log(end);
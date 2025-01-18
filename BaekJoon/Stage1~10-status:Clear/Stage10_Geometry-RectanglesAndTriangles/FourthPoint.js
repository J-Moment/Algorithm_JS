const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let A = input[0].split(' ').map(Number);
let B = input[1].split(' ').map(Number);
let C = input[2].split(' ').map(Number);
let xlist = [];
let ylist = [];

for(let i = 0 ; i <= 2 ; i++){
    let point = input[i].split(' ').map(Number);
    let x = point[0];
    let y = point[1];
    if(xlist.includes(x)){
        const idx = xlist.indexOf(x);
        xlist.splice(idx, 1);
    } else{
        xlist.push(x);
    }

    if(ylist.includes(y)){
        const idx = ylist.indexOf(y);
        ylist.splice(idx, 1);
    } else{
        ylist.push(y);
    }
}
console.log(`${xlist[0]} ${ylist[0]}`);
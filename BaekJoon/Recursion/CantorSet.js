const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n").map(Number);

const cantor = (strArr) => {
    if(strArr.length === 1) return strArr;
    let len = Math.floor(strArr.length/3);
    return (
        cantor(strArr.slice(0, len)) + " ".repeat(len) + cantor(strArr.slice(2 * len))
    );
};

for(let N of input){
    let strArr = ("-").repeat(3**N);
    console.log(cantor(strArr));
}
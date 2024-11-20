const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split('\n');

const N = +input[0];
let arr = [];
let cnt = 0;
let tmp = 0;
for(let i = 1 ; i <= N ; i++) {
    arr.push(input[i].split(' ').map((item) => +item));
}
arr.sort((a, b) => {
    if((a[1] - b[1]) === 0) return a[0] - b[0];
    return a[1] - b[1]
})

for(let i = 0 ; i < arr.length; i++) {
    if(arr[i][0] >= tmp){
        cnt++;
        tmp = arr[i][1];
    }
    else{
        continue;
    }
}

console.log(cnt);
const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

for(let t = 0 ; t < input.length - 1 ; t++){
    let N = +input[t];
    let li = [];
    let ans = "";

    for(let i = 1 ; i < N ; i++){
        if(N % i === 0) li.push(i);
    }
    const sum = li.reduce((acc, cur) => acc + cur, 0);
    if(sum === N){
        ans += `${N} = `;
        for(let i = 0 ; i < li.length-1 ; i++){
            ans += `${li[i]} + `;
        }
        ans+=li[li.length-1];
    } else{
        ans += `${N} is NOT perfect.`
    }
    console.log(ans);
}
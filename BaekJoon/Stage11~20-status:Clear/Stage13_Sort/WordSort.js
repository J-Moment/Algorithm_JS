const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = Number(input[0]);
let dict = [];

for(let i = 1 ; i <= N ; i++){
    let word = input[i];
    if(!dict.includes(word)) dict.push(word);
}
dict.sort((a, b) =>{
    if(a.length === b.length) return a.localeCompare(b);
    return a.length - b.length;
})
console.log(dict.join("\n"));
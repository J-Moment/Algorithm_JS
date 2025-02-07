let fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');

let S = input[0];
let q = Number(input[1]);
let N = S.length;
let prefixSum = Array.from({ length: 26 }, () => new Array(N + 1).fill(0));

for (let i = 0; i < N; i++) {
    let charIdx = S.charCodeAt(i) - 97;
    for (let j = 0; j < 26; j++) {
        prefixSum[j][i + 1] = prefixSum[j][i] + (j === charIdx ? 1 : 0);
    }
}

let results = [];
for(let i = 2 ; i < q + 2 ; i++){
    let [alphabet, left, right] = input[i].split(" ");
    let charIdx = alphabet.charCodeAt(0) - 97;
    left = Number(left);
    right = Number(right);
    
    let count = prefixSum[charIdx][right + 1] - prefixSum[charIdx][left];
    results.push(count);
}

console.log(results.join("\n"));
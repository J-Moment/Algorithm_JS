const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const N = parseInt(input[0]);
const K = parseInt(input[1]);

function countLessThanOrEqual(mid, N) {
    let count = 0;
    for (let i = 1; i <= N; i++) {
        count += Math.min(Math.floor(mid / i), N);
    }
    return count;
}

function findKNum(N, K) {
    let left = 1, right = N * N, answer = 0;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let count = countLessThanOrEqual(mid, N);

        if (count >= K) {
            answer = mid; 
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return answer;
}

console.log(findKNum(N, K));
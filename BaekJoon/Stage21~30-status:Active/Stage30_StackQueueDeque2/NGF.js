const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);

const map = new Map();
const answer = Array(N).fill(-1);
const stack = [];

for (const num of A) {
    map.set(num, (map.get(num) || 0) + 1);
}

for (let i = 0; i < N; i++) {
    while (stack.length > 0 && map.get(A[stack[stack.length - 1]]) < map.get(A[i])) {
        answer[stack.pop()] = A[i];
    }
    stack.push(i);
}

console.log(answer.join(" "));
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let N = Number(input[0]);
const heights = input.slice(1).map(Number);

function countPairs(heights) {
    let stack = [];
    let count = 0;

    for (let i = 0; i < heights.length; i++) {
        let sameHeightCount = 1;

        while (stack.length > 0 && stack[stack.length - 1][0] < heights[i]) {
            count += stack[stack.length - 1][1];
            stack.pop();
        }

        if (stack.length > 0 && stack[stack.length - 1][0] === heights[i]) {
            count += stack[stack.length - 1][1];
            sameHeightCount = stack[stack.length - 1][1] + 1;
            stack.pop();
        }

        if (stack.length > 0) {
            count += 1;
        }

        stack.push([heights[i], sameHeightCount]);
    }

    return count;
}

console.log(countPairs(heights));
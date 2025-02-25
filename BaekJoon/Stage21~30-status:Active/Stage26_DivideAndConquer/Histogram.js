const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

function getMaxArea(histogram, left, right) {
    if (left === right) return histogram[left]; // 단일 막대기

    const mid = Math.floor((left + right) / 2);

    // 왼쪽과 오른쪽의 최대 넓이
    const leftArea = getMaxArea(histogram, left, mid);
    const rightArea = getMaxArea(histogram, mid + 1, right);

    // 가운데를 포함하는 최대 넓이 계산
    let low = mid;
    let high = mid + 1;
    let minHeight = Math.min(histogram[low], histogram[high]);
    let midArea = minHeight * 2; // 두 개의 막대기 포함

    while (left < low || high < right) {
        if (high < right && (low === left || histogram[low - 1] < histogram[high + 1])) {
            high++;
            minHeight = Math.min(minHeight, histogram[high]);
        } else {
            low--;
            minHeight = Math.min(minHeight, histogram[low]);
        }
        midArea = Math.max(midArea, minHeight * (high - low + 1));
    }

    return Math.max(leftArea, rightArea, midArea);
}

for(let test of input) {
    if(test === '0') break;
    else {
        [n, ...heights] = test.split(' ').map(Number);
        console.log(getMaxArea(heights, 0, n-1));
    }
}
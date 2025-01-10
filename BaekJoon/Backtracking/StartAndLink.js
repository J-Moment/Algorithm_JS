const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = +input[0];
let li = [];
let min = Number.MAX_SAFE_INTEGER;
for(let i = 1 ; i <= N ; i++) {
    li.push(input[i].split(' ').map(Number));
}

const halfN = N / 2;
const check = new Array(N).fill(false);

const dfs = (idx, depth) => {
    if(depth === halfN) {
        const left = [];
        const right = [];
        let lSum = 0;
        let rSum = 0;

        for(let i = 0 ; i < N ; i++) {
            if(check[i]) left.push(i);
            else right.push(i);
        }

        //중복 계산을 줄여는 식
        if (left[0] > right[0]) return;

        for(let i = 0 ; i < halfN ; i++){
            for(let j = i + 1 ; j < halfN ; j++){
                lSum = lSum + li[left[i]][left[j]] + li[left[j]][left[i]];
                rSum = rSum + li[right[i]][right[j]] + li[right[j]][right[i]];
            }
        }
        min = Math.min(min, Math.abs(lSum-rSum));
        return;
    }

    for(let i = idx; i < N ; i++) {
        check[i] = true;
        dfs(i + 1, depth + 1);
        check[i] = false;
    }
}

dfs(0, 0);
console.log(min);
/*
문제 : 정해진 팀을 두팀으로 나눠 팀의 전력의 차이를 최소값으로 만든다
=> N명중 N/2명을 뽑아 전력을 구하고 나머지 N/2의 전력을 구한다.

세부분석 : 
1. 뽑는다
2. N/2명을 뽑았을때 계산한다.

1~N명중 한명씩 뽑는 과정을 반복하고 N/2일때 합을 구한다. => 중복계산 문제는 어떻게 해결해야 할까
*/
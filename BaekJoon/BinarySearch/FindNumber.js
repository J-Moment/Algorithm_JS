const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let N = Number(input[0]);
let Nlist = input[1].split(' ').map(Number);
let M = Number(input[2]);
let Mlist = input[3].split(' ').map(Number);

Nlist.sort((a, b) => a - b);

const BinarySearch = (target) => {
    let left = 0;
    let right = Nlist.length-1;
    while(left <= right){
        let mid = Math.floor((left + right)/2)
        if(Nlist[mid] === target) {
            console.log(1);
            return;
        } else if(Nlist[mid] > target) {
            right = mid-1;
        } else {
            left = mid+1;
        }
    }
    console.log(0);
    return;
}

for(let i = 0 ; i < M ; i++){
    BinarySearch(Mlist[i]);
}
/*
문제 재정의 : N개의 수들중에 M개의 숫자가 있는지 빠르게 찾을것

세부 분석 :
빠르게 정렬 하려면 N개의 수들을 찾을 때의 속도를 높여야한다.
1. N개의 수를 sort로 정렬한다. 시간 : (O(NlogN)) => V8엔진(chrome, node)의 경우 
2. M개의 수를 Nlist안에서 가운데 부터 찾아낸다.
3. target이 중앙값보다 크다면 왼쪽으로, 작다면 오른쪽으로 절반만큼씩 이동한다.
*/
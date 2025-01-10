const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let li = [];
let answer = [];

for(let i = 0 ; i < 9 ; i++) {
    li.push(input[i].split(' ').map(Number));
}

const zeroList=[];
for(let i = 0; i < 9 ; i++){
    for(let j = 0; j < 9; j++){
        if(li[i][j] === 0){
            zeroList.push([i, j]);
        }
    }
}

const N = zeroList.length;

const dfs = (cnt) => {
    if (cnt === N) {
        for(let i = 0 ; i < 9 ; i++){
            console.log(li[i].join(" "));
        }
        process.exit();
    }

    const [y, x] = zeroList[cnt];

    for(let i = 1 ; i <= 9; i++){
        if(check(x, y, i)){
            li[y][x] = i;
            dfs(cnt + 1);
            li[y][x] = 0;
        }
    }
}

const check = (x, y, num) => {
    //가로줄 체크
    for(let i = 0 ; i < 9 ; i++){
        if(li[y][i] === num) return false;
    }

    //세로줄 체크
    for(let i = 0 ; i < 9 ; i++){
        if(li[i][x] === num) return false;
    }

    let threeX = Math.floor(x / 3) * 3;
    let threeY = Math.floor(y / 3) * 3;
    for(let i = threeY ; i < threeY + 3 ; i++){
        for(let j = threeX ; j < threeX + 3 ; j++){
            if(li[i][j] === num) return false;
        }
    }

    return true;
}

dfs(0);

/*
문제 재정의 : 주어진 배열에서 빈칸 0에 대해서 채워넣는다.

세부분석 : 
1. 가로줄을 만족한다.
2. 세로줄을 만족한다.
3. 3X3 사각형을 만족한다.

제로를 찾는다.
리스트를 만든다.

리스트 값에 대하여 1, 2, 3을 실행한다.
이에 대하여 값이 나올경우 다음으로 넘어간다.
그러나 값을 낼 수 없는 경우 다음을 진행하고 다시 backtracking으로 돌아온다.

*/
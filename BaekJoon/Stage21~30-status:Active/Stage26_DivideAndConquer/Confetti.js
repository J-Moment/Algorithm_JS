const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = +input[0];
let li = [];

let [white, blue] = [0, 0];

for(let i = 1 ; i <= N ; i++ ){
    li.push(input[i].split(' ').map(Number));
}

//분리
const divideAndConquer = (x, y, N) => {
    if (N === 1) {
        if (li[x][y] === 0) white += 1;
        else blue += 1;
        return;
    }

    let first = li[x][y];
    let isSame = true;
    
    for(let i = x ; i < x + N ; i++) {
        for(let j = y ; j < y + N ; j++) {
            if(li[i][j] !== first) {
                isSame = false;
                break;
            }
        }
        if(!isSame) break;
    }

    if(isSame){
        if(first === 0) white += 1;
        else blue += 1;
    }
    else {
        let half = Math.floor(N/2);
        divideAndConquer(x, y, half);
        divideAndConquer(x + half, y, half);
        divideAndConquer(x, y + half, half);
        divideAndConquer(x + half, y + half, half);
    }
}

divideAndConquer(0, 0, N);
console.log(white);
console.log(blue);
const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');

let N = +input[0];
const arr = Array.from(Array(100), () => Array(100).fill(0));
let ans = 0;
for(let t = 0 ; t < N ; t++) {
	let [x, y] = input[t+1].split(' ').map(Number);
	for(let i = x ; i < x+10 ; i++){
		for(let j = y ; j < y+10 ; j++){
			if(arr[i][j] !== 1) {
				arr[i][j] = 1;
				ans++;
			}
		}
	}
}

console.log(ans);
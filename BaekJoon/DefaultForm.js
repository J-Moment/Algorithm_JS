// readline 모듈 사용
// ** 한 줄 입력 **
/*
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
  console.log(line);

  rl.close();
}).on("close", function() {
  process.exit();
});
*/

/*
// ** 한 줄에 정수 여러개 입력 **
function solution(a , b){
    console.log(a+b);
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let input = [];
rl.on("line", function(line){
    input = line.split(' ').map((el) => parseInt(el));
    rl.close();
}).on("close", function(){
    let A = input[0];
    let B = input[1];
    solution(A, B);
    process.exit();
})
*/


/*
// ** 정수 하나 입력 **
function solution(num) {

}

const readline = require('readline');
let input;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
    input = parseInt(line);
    rl.close();
}).on("close", function() {
    solution(input);
    process.exit();
});
*/

/*
// ** 여러 줄 입력 **
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
  input.push(line)
})
  .on('close', function () {
  console.log(input);
  process.exit();
});
*/


/*
// fs 모듈 사용

// ** 한 줄 입력 **
const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().trim().split('\n');
*/

// **입력**
/*
const fs = require('fs');
const filepath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filepath).toString().split('\n');
*/

/*
// ** 여러 줄 입력 **
let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');

let count = input[0];
let numbers = [];

for (let i = 1; i < input.length; i++) {
  if (input[i] !== '') {
    numbers.push(input[i].split(' '));
  }
}

for (let i = 0; i < numbers.length; i++){
  let num1 = Number(numbers[i][0]);
  let num2 = Number(numbers[i][1]);

  console.log(num1 + num2);
}
*/
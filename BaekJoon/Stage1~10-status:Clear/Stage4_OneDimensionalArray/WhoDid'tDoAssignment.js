function solution() {
	let arr = [];
	for (let i = 1; i <= 30; i++) {
		if (!input.includes(i)) arr.push(i);
		if (arr.length === 2) break;
	}
	console.log(arr.join("\n"));
	process.exit();
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  let input = [];
  
  rl.on('line', function (line) {
        input.push(+line);
  })
    .on('close', function () {
        solution();
    process.exit();
});
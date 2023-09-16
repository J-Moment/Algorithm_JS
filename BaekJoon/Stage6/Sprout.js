function solution() {
    console.log(
`         ,r'"7
r\`-_   ,'  ,/
 \\\. ". L_r'
   \`~\\/
      |
      |`
        );
}


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
  rl.close();
}).on("close", function() {
    solution();
  process.exit();
});
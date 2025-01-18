const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
  const name = line;
  console.log(name+"\?\?\!");
rl.close();
}).on("close", function() {
  process.exit();
});
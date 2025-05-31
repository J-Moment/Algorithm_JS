const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N = null;
let startHeight = null;

rl.on("line", (line) => {
  if (N === null) {
    N = parseInt(line.trim(), 10);
    process.stdout.write(`? 1\n`);
  }
  else if (startHeight === null) {
    startHeight = parseInt(line.trim(), 10);
    process.stdout.write(`? ${N}\n`);
  }
  else {
    const endHeight = parseInt(line.trim(), 10);
    const diff = endHeight - startHeight;
    process.stdout.write(`! ${diff}\n`);
    rl.close();
  }
});

rl.on("close", () => {
  process.exit(0);
});
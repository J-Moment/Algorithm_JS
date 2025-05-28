const fs = require('fs');

function askSync(question) {
  fs.writeSync(1, question + '\n');
  const buf = Buffer.alloc(16);
  const bytes = fs.readSync(0, buf, 0, 16, null);
  return parseInt(buf.toString('utf8', 0, bytes).trim(), 10);
}

let A, B;

for (let x = 1; x <= 9; x++) {
  const res = askSync(`? A ${x}`);
  if (res === 1) { A = x; break; }
}

for (let x = 1; x <= 9; x++) {
  const res = askSync(`? B ${x}`);
  if (res === 1) { B = x; break; }
}

fs.writeSync(1, `! ${A + B}\n`);
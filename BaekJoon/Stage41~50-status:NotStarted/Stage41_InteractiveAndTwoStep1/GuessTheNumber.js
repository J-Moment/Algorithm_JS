const fs = require("fs");

function readLine() {
  let line = "";
  const buf = Buffer.alloc(1);
  while (true) {
    const n = fs.readSync(0, buf, 0, 1, null);
    if (n <= 0 || buf[0] === 10) break;
    line += buf.toString();
  }
  return line.trim();
}

function ask(x) {
  fs.writeSync(1, `? ${x}\n`);
  const buf = Buffer.alloc(16);
  let read = 0, token = "";
  while (true) {
    const n = fs.readSync(0, buf, 0, 1, null);
    if (n <= 0) break;
    const ch = buf[0];
    if (ch === 45  || (ch >= 48 && ch <= 57) ) {
      token += String.fromCharCode(ch);
      while (true) {
        const m = fs.readSync(0, buf, 0, 1, null);
        if (m <= 0) break;
        const c2 = buf[0];
        if (c2 >= 48 && c2 <= 57) {
          token += String.fromCharCode(c2);
        } else {
          break;
        }
      }
      break;
    }
  }
  return parseInt(token, 10);
}

const N = parseInt(readLine(), 10);
let left = 1, right = N;
while (left <= right) {
  const mid = Math.floor(left + (right - left) / 2);
  const resp = ask(mid);
  if (resp === 0) {
    fs.writeSync(1, `= ${mid}\n`);
    break;
  } else if (resp < 0) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
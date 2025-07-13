const fs = require('fs');
const data = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt",'utf8')
               .trim().split(/\s+/).map(Number);
let p = 0;

const N = data[p++];

const xs = new Array(N), ys = new Array(N);
for (let i = 0; i < N; i++) {
  xs[i] = data[p++];
  ys[i] = data[p++];
}

const comp = Array.from(new Set(xs)).sort((a,b)=>a-b);
const M = comp.length;
const xi = new Array(N);
for (let i = 0; i < N; i++) {
  let v = xs[i], l = 0, r = M-1;
  while (l <= r) {
    const m = (l + r) >>> 1;
    if (comp[m] === v) { l = m; break; }
    else if (comp[m] < v) l = m + 1;
    else r = m - 1;
  }
  xi[i] = l + 1;
}

const ord = Array.from({length:N}, (_,i)=>i);
ord.sort((a,b)=>{
  if (ys[a] !== ys[b]) return ys[b] - ys[a];
  return xs[a] - xs[b];
});

const fenw = new Uint32Array(M+1);
function sum(i) {
  let s = 0;
  for (; i > 0; i -= i & -i) s += fenw[i];
  return s;
}
function add(i) {
  for (; i <= M; i += i & -i) fenw[i]++;
}

const MOD = 1000000007;
let ans = 0;
for (let i = 0; i < N; ) {

  let j = i, y0 = ys[ord[i]];
  while (j < N && ys[ord[j]] === y0) j++;

  for (let k = i; k < j; k++) {
    const idx = ord[k];
    const xidx = xi[idx];
    const L = sum(xidx - 1);
    const R = sum(M) - sum(xidx);
    ans = (ans + L * R) % MOD;
  }
  for (let k = i; k < j; k++) {
    add(xi[ord[k]]);
  }

  i = j;
}

process.stdout.write(ans.toString());
const fs = require("fs");
const input = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "./input.txt",
    "utf8"
  )
  .trim()
  .split(/\s+/)
  .map(Number);
let p = 0;

const V = input[p++],
  E = input[p++];
const g = Array.from({ length: V + 1 }, () => []);
const rg = Array.from({ length: V + 1 }, () => []);

for (let i = 0; i < E; i++) {
  const a = input[p++],
    b = input[p++];
  g[a].push(b);
  rg[b].push(a);
}

const visited = new Uint8Array(V + 1);
const order = [];

function dfs1(start) {
  const stack = [start];
  const itStack = [0];
  visited[start] = 1;
  while (stack.length) {
    const v = stack[stack.length - 1];
    let i = itStack[itStack.length - 1];
    if (i < g[v].length) {
      const to = g[v][i];
      itStack[itStack.length - 1] = i + 1;
      if (!visited[to]) {
        visited[to] = 1;
        stack.push(to);
        itStack.push(0);
      }
    } else {
      order.push(v);
      stack.pop();
      itStack.pop();
    }
  }
}

for (let v = 1; v <= V; v++) {
  if (!visited[v]) dfs1(v);
}

const compId = Array(V + 1).fill(-1);
let sccCnt = 0;
const comps = [];

function dfs2(start, cid) {
  const stack = [start];
  compId[start] = cid;
  const arr = [];
  while (stack.length) {
    const v = stack.pop();
    arr.push(v);
    for (const to of rg[v]) {
      if (compId[to] === -1) {
        compId[to] = cid;
        stack.push(to);
      }
    }
  }
  return arr;
}

for (let i = order.length - 1; i >= 0; i--) {
  const v = order[i];
  if (compId[v] === -1) {
    const comp = dfs2(v, sccCnt++);
    comp.sort((a, b) => a - b);
    comps.push(comp);
  }
}

comps.sort((a, b) => a[0] - b[0]);

let out = [];
out.push(String(sccCnt));
for (const c of comps) {
  out.push(c.join(" ") + " -1");
}
console.log(out.join("\n"));
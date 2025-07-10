const fs = require("fs");
const data = fs.readFileSync("/dev/stdin", "utf8").trim().split(/\s+/).map(Number);
let ptr = 0;

const T = data[ptr++];
const out = [];

for (let tc = 0; tc < T; tc++) {
  const n = data[ptr++];
  const last = data.slice(ptr, ptr + n);
  ptr += n;

  const adj = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false));
  const indegree = Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const u = last[i],
        v = last[j];
      adj[u][v] = true;
      indegree[v]++;
    }
  }

  const m = data[ptr++];
  for (let i = 0; i < m; i++) {
    const a = data[ptr++],
      b = data[ptr++];
    if (adj[a][b]) {
      adj[a][b] = false;
      adj[b][a] = true;
      indegree[b]--;
      indegree[a]++;
    } else if (adj[b][a]) {
      adj[b][a] = false;
      adj[a][b] = true;
      indegree[a]--;
      indegree[b]++;
    } else {
      ptr = ptr;
    }
  }

  const q = [];
  for (let i = 1; i <= n; i++) {
    if (indegree[i] === 0) q.push(i);
  }

  const result = [];
  let ambiguous = false;
  for (let cnt = 0; cnt < n; cnt++) {
    if (q.length === 0) {
      result.length = 0;
      break;
    }
    if (q.length > 1) {
      ambiguous = true;
    }
    const u = q.shift();
    result.push(u);

    for (let v = 1; v <= n; v++) {
      if (adj[u][v]) {
        indegree[v]--;
        if (indegree[v] === 0) {
          q.push(v);
        }
      }
    }
  }

  if (result.length < n) {
    out.push("IMPOSSIBLE");
  } else if (ambiguous) {
    out.push("?");
  } else {
    out.push(result.join(" "));
  }
}

console.log(out.join("\n"));
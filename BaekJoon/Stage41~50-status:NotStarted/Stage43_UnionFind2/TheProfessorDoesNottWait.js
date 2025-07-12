const fs = require("fs");
const data = fs.readFileSync("/dev/stdin", "utf8").trim().split(/\s+/);
let idx = 0,
  out = [];

while (true) {
  const N = +data[idx++],
    M = +data[idx++];
  if (N === 0 && M === 0) break;

  const parent = new Array(N + 1);
  const dist = new Array(N + 1);
  for (let i = 1; i <= N; i++) {
    parent[i] = i;
    dist[i] = 0;
  }

  function find(x) {
    if (parent[x] === x) return x;
    const p = parent[x];
    const r = find(p);
    dist[x] += dist[p];
    return (parent[x] = r);
  }

  function union(a, b, w) {
    const ra = find(a),
      rb = find(b);
    if (ra === rb) return;
    dist[ra] = dist[b] - dist[a] - w;
    parent[ra] = rb;
  }

  for (let i = 0; i < M; i++) {
    const op = data[idx++];
    if (op === "!") {
      const a = +data[idx++],
        b = +data[idx++],
        w = +data[idx++];
      union(a, b, w);
    } else {
      const a = +data[idx++],
        b = +data[idx++];
      if (find(a) !== find(b)) {
        out.push("UNKNOWN");
      } else {
        out.push((dist[a] === undefined, dist[b] - dist[a]).toString());
      }
    }
  }
}

process.stdout.write(out.join("\n"));
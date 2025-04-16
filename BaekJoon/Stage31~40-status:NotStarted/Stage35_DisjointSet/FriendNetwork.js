const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

let idx = 0;
const T = +input[idx++];
const output = [];

for (let t = 0; t < T; t++) {
  const F = +input[idx++];
  const parent = {};
  const size = {};

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA !== rootB) {
      parent[rootB] = rootA;
      size[rootA] += size[rootB];
    }

    return size[rootA];
  }

  for (let i = 0; i < F; i++) {
    const [a, b] = input[idx++].split(" ");

    if (!parent[a]) {
      parent[a] = a;
      size[a] = 1;
    }
    if (!parent[b]) {
      parent[b] = b;
      size[b] = 1;
    }

    const res = union(a, b);
    output.push(res);
  }
}

console.log(output.join("\n"));
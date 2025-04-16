const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const T = Number(input[0]);
let index = 1;
let result = [];

function isBipartiteGraph(V, E, edges) {
    const graph = Array.from({ length: V + 1 }, () => []);
    const color = Array(V + 1).fill(0);

    for (let i = 0; i < E; i++) {
        const [u, v] = edges[i];
        graph[u].push(v);
        graph[v].push(u);
    }

    const bfs = (start) => {
        let queue = [start];
        color[start] = 1;

        while (queue.length > 0) {
            const node = queue.shift();

            for (const next of graph[node]) {
                if (color[next] === 0) {
                    color[next] = -color[node];
                    queue.push(next);
                } else if (color[next] === color[node]) {
                    return false;
                }
            }
        }
        return true;
    };

    for (let i = 1; i <= V; i++) {
        if (color[i] === 0) {
            if (!bfs(i)) return "NO";
        }
    }
    return "YES";
}

for (let t = 0; t < T; t++) {
    const [V, E] = input[index].split(" ").map(Number);
    const edges = input.slice(index + 1, index + 1 + E).map(line => line.split(" ").map(Number));
    result.push(isBipartiteGraph(V, E, edges));
    index += E + 1;
}

console.log(result.join("\n"));
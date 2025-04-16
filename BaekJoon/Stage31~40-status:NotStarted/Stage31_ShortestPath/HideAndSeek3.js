const fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filepath).toString().trim().split("\n");

const [N, K] = input[0].split(' ').map(Number);

const MAX = 100000;
const dist = Array(MAX + 1).fill(Infinity);
const deque = [];

dist[N] = 0;
deque.push(N);

while (deque.length) {
    const now = deque.shift();

    if (now === K) break;

    if (now * 2 <= MAX && dist[now * 2] > dist[now]) {
        dist[now * 2] = dist[now];
        deque.unshift(now * 2);
    }

    if (now - 1 >= 0 && dist[now - 1] > dist[now] + 1) {
        dist[now - 1] = dist[now] + 1;
        deque.push(now - 1);
    }

    if (now + 1 <= MAX && dist[now + 1] > dist[now] + 1) {
        dist[now + 1] = dist[now] + 1;
        deque.push(now + 1);
    }
}

console.log(dist[K]);
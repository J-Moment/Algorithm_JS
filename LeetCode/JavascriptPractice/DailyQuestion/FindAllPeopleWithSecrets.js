/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function (n, meetings, firstPerson) {
  meetings.sort((a, b) => a[2] - b[2]);

  const secret = new Set([0, firstPerson]);

  let i = 0;
  while (i < meetings.length) {
    let j = i;
    const time = meetings[i][2];

    const graph = new Map();

    while (j < meetings.length && meetings[j][2] === time) {
      const [x, y] = meetings[j];
      if (!graph.has(x)) graph.set(x, []);
      if (!graph.has(y)) graph.set(y, []);
      graph.get(x).push(y);
      graph.get(y).push(x);
      j++;
    }

    const queue = [];
    const visited = new Set();

    for (const person of graph.keys()) {
      if (secret.has(person)) {
        queue.push(person);
        visited.add(person);
      }
    }

    while (queue.length) {
      const cur = queue.shift();
      for (const next of graph.get(cur)) {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }

    for (const person of visited) {
      secret.add(person);
    }
    i = j;
  }

  return Array.from(secret);
};
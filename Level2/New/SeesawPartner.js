function solution(weights) {
    let answer = 0;
    const map = new Map();

    weights.sort((a, b) => a - b);

    for (let w of weights) {
        if (map.has(w)) answer += map.get(w);
        if (map.has(w * 2 / 3)) answer += map.get(w * 2 / 3);
        if (map.has(w * 2 / 4)) answer += map.get(w * 2 / 4);
        if (map.has(w * 3 / 4)) answer += map.get(w * 3 / 4);

        map.set(w, (map.get(w) || 0) + 1);
    }
    return answer;
}
function solution(n) {
    let answer = 0;
    const arr = new Array(n + 1).fill(true);
    const end = Math.sqrt(n)

    for (let i = 2; i <= end; ++i) {
        if (arr[i] === false) {
            continue;
        }
        for (let k = i * i; k <= n; k += i) {
            arr[k] = false;
        }
    }
    for (let i = 2; i <= n; ++i) {
        if (arr[i] === true) {
            answer++;
        }
    }
    return answer;
}
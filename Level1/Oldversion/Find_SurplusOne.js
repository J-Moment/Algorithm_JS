function solution(n) {
    var min = 0;
    for(let i = 1; i < n; i++) {
        if (n % i === 1) {
            min = i;
            break;
        }
    }
    return min;
}
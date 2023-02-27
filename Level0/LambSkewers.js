function solution(n, k) {
    var answer = 0;
    let tmp = parseInt(n / 10);
    answer = (12000 * n) + 2000 * (k - tmp);

    return answer;
}
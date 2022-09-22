function solution(n) {
    var answer = n + "";
    answer = answer.split('');
    return Number(answer.sort((a, b) => b - a).join(''));
}
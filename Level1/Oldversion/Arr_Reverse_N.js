function solution(n) {
    var answer = [];
    n = n + "";
    for (var i = n.length-1 ; i >= 0; i--) {
        answer.push(Number(n[i]));
    }
    return answer;
}
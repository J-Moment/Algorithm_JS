function solution(n) {
    var answer = 0;

    var tmp = String(n)
    for (let i = 0; i < tmp.length; i++) {
        answer += parseInt(tmp[i]);
    }
    return answer;
}
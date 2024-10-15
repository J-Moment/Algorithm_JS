function solution(a, b) {
    var answer = 0;
    if(a > b) {
        let tmp = 0;
        tmp = a;
        a = b;
        b = tmp;
    }
    for (var i = a ; i <= b; i++) {
        answer += i;
    }
    return answer;
}
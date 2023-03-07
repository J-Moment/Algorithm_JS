function solution(dot) {
    var answer = 1;
    if (dot[0] < 0) {
        answer++;
        if (dot[1] < 0)
            answer++;
    } else if (dot[1] < 0) {
        answer = 4;
    }
    return answer;
}
function solution(strlist) {
    var answer = [];
    for (i in strlist) {
        answer.push(strlist[i].length)
    }
    return answer;
}
function solution(seoul) {
    var answer = '';
    answer += "김서방은 ";
    
    let idx = seoul.indexOf("Kim");
    answer += idx;
    answer += "에 있다";
    return answer;
}
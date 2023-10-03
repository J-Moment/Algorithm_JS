function solution(s) {
    let answer = true;

    //스택처럼 활용
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] == '(') {
            stack.push(s[i]);
        }
        else if (s[i] == ')' && i != 0) {
            if (stack[stack.length - 1] == '(') {
                stack.pop();
            }
        }
        else {
            answer = false;
            return answer;
        }
    }

    //배열이 비어있는지
    if (stack.length != 0) {
        answer = false;
    }

    return answer;
}
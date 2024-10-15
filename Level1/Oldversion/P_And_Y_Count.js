function solution(s){
    var answer = true;
    var cnt = 0;
    s = s + "";
    
    for (var i = 0 ; i < s.length; i++) {
        if(s[i] == "p" || s[i] == "P") {
            cnt++;
        }
        else if(s[i] == "y" || s[i] == "Y") {
            cnt--;
        }
    }
    
    if(cnt !== 0)
        answer = false;
    
    return answer;
}
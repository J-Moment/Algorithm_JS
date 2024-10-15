function solution(s){
    let answer = true;
    let Pnum = 0;
    let Ynum = 0;
    
    s = s.toUpperCase();
    
    for(let i = 0 ; i < s.length; i++) {
        if(s[i] === "P") Pnum++;
        else if(s[i] === "Y") Ynum++;
    }
    
    if(Pnum !== Ynum) answer = false;
    return answer;
}
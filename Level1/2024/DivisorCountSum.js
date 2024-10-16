function solution(left, right) {
    const DivisorCheck = (num) => {
        let checkNum = 0;
        for(let i = 1; i <= num; i++) {
            if(num % i === 0) checkNum++;
        }
        return checkNum%2 === 0 ? true : false
    }
    
    let answer = 0;
    for(let i = left ; i <=right; i++) {
        DivisorCheck(i) ? answer+= i : answer-= i;
    }
    return answer;
}
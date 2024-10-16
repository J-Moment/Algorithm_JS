function solution(d, budget) {
    let answer = 0;
    
    d.sort((a,b) => b - a);
    
    while(budget >= d[d.length-1]) {
        budget -= d.pop();
        answer++;
    }

    return answer;
}
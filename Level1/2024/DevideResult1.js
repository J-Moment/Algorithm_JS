function solution(n) {
    var answer = 0;
    for(let i = 2; i <= n-1 ; i++){
        if(n%i === 1) return i;
    }
}
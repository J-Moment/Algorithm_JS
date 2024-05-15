function solution(n) {
    let memo = [];
    memo.push(0);
    memo.push(1);
    if(n<=1) {
        return memo[n];
    } else {
        for(let i = 2 ; i <= n; i++) {
            memo.push((memo[i-2] + memo[i-1])%1234567);
        }
    }
    return memo[n];
}
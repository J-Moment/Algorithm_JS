function solution(n) {
    let memo = [0, 1];

    for (let i = 2; i <= n; i++) {
        fibo(i);
    }

    function fibo(num) {
        memo.push((memo[num - 1] + memo[num - 2]) % 1234567);
    }
    return memo[n];
}
function solution(x) {
    return x % x.toString().split("").reduce((a,b) => a + b*1, 0) === 0 ? true : false;
}
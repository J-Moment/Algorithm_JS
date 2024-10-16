function solution(price, money, count) {
    let answer = price*count*(1 + count)/2 - money;
    return answer > 0 ? answer : 0;
}
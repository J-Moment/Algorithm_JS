function solution(n) {
    let str = "수박";
    return n%2 === 0 ? str.repeat(n/2) : str.repeat(Math.floor(n/2)) + str[0];
}
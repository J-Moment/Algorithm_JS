function solution(num) {
    var answer = -1;
    let times = 0;
    while(times <= 500 && num !== 1) {
        num % 2 === 0 ? num /= 2 : num = num*3 +1;
        times++;
    }
    return times <= 500 ? times : -1;
}
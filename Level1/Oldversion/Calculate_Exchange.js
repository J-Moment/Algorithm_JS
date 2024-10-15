function solution(price, money, count) {
    var answer = 0;
    let tmp_price = 0;
    for(var i = 1 ; i <= count ; i++) {
        tmp_price += (price * i);
    }
    if (money < tmp_price) {
        answer = (tmp_price - money);
    }
    return answer;
}
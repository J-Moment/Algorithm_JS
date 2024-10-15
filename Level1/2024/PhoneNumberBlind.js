function solution(phone_number) {
    let times = phone_number.length - 4;
    return "*".repeat(times) + phone_number.slice(times);
}
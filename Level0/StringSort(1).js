function solution(my_string) {
    return my_string.split("").map(Number).filter(num => !isNaN(num)).sort((a, b) => a - b);
}
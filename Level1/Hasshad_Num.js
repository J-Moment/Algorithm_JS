function solution(x) {
    var answer = true;
    var sum = 0;
    var arr = String(x).split("");
    
    for (var i = 0 ; i < arr.length ; i++) {
        sum += Number(arr[i]);
    }
    if(x % sum !== 0)
        answer = false;
    return answer;
}
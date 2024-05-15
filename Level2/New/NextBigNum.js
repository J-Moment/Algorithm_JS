function solution(n) {
    let originLength = n.toString(2).split("1").length;
    while(true) {
        n++;
        if(n.toString(2).split("1").length === originLength) return n;
    }
}
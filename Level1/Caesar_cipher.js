function solution(s, n) {
    return s.split("").map((el)=>{
        if (el == " "){
            return el;
        }
        const tmp = el.charCodeAt()
        return el.toUpperCase().charCodeAt()+n > 90 
            ? String.fromCharCode(tmp+n-26) 
            : String.fromCharCode(tmp+n)
    }).join('')
}
function buy(i, want, number, discount){
    let count = 0;
    const num = Object.assign([],number)
    
    for(let j = 0; j<10; j++){
        if(want.includes(discount[i+j])){
            num[want.indexOf(discount[i+j])] -= 1;
            
            if(num[want.indexOf(discount[i+j])] === 0){
                count++;
            }
        }
    }
    if(want.length === count){
        return true
    }else{
        return false;
    }
}


function solution(want, number, discount) {
    var answer = 0;
    for(let i=0; i<discount.length-9; i++){
        if(buy(i,want, number, discount)){
            answer += 1;
        }
        
    }
    return answer;
}
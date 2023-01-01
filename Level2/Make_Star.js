function solution(line) {
    var answer = [];
    const getCrossPoint = ( [A, B, E], [C, D, F]) => {
        if( A * D - B * C === 0){
            return false;
        }
        const x = ((B * F) - (E * D)) / ((A * D) - (B * C));
        const y = ((E * C) - (A * F)) / ((A * D) - (B * C));
         
        return Number.isInteger(x) && Number.isInteger(y) ? [x,y] : false;
    }
    const crossPoint = [];
    line.forEach( r1 => line.forEach( r2 => 
             getCrossPoint(r1, r2) ? crossPoint.push(getCrossPoint(r1, r2)) : null ))
    
    let xMin = Math.min( ...crossPoint.map(ele => ele[0]));
    let xMax = Math.max( ...crossPoint.map(ele => ele[0]));
    let yMin = Math.min( ...crossPoint.map(ele => ele[1]));
    let yMax = Math.max( ...crossPoint.map(ele => ele[1]));

    answer = Array.from( Array(yMax - yMin + 1) , _ => Array(xMax - xMin + 1).fill('.') );
    
    crossPoint.forEach( ([x,y]) => {
        answer[yMax - y][x - xMin] = '*';
    })

    return answer.map( ele => ele.join(''));
}

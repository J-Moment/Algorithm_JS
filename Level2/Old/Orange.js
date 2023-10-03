function solution(k, tangerine) {
    const map = new Map();
    
    for (const el of tangerine) {
        if (map.has(el)) map.set(el, map.get(el) + 1);
        else map.set(el, 1);
    }
    
    const countArr = [...map.values()].sort((a, b) => b - a);
    
    let result = 0;
    
    for (const el of countArr) {
        result += 1;
        k -= el;
        
        if (k <= 0) break;
    }
    
    return result;
}
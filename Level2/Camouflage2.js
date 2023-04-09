function solution(clothes) {
    const clothesMap = {};
    let answer = 1;
    clothes.forEach(row => {
        const [name, kinds] = row;
        if (clothesMap.hasOwnProperty(kinds)) {
            clothesMap[kinds]++;
        }
        else {
            clothesMap[kinds] = 1;
        }
    })

    for (const key in clothesMap) {
        answer *= (clothesMap[key] + 1);
    }
    return answer - 1;
}
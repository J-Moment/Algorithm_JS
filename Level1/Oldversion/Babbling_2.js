function solution(babbling) {
    let count = 0;
    let dup = ['ayaaya', 'yeye', 'woowoo', 'mama'];
    while (babbling.length) {
        let b = babbling.pop();
        if (dup.some(v=>b.includes(v))) continue;
        b = b.replaceAll('aya','1').replaceAll('ye','2').replaceAll('woo','3').replaceAll('ma','4');
        b = b.replace(/[1234]/g, '');
        if (b.length === 0) count++;
    }

    return count;
}
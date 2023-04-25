function solution(begin, end) {
    return Array.from({ length: end + 1 - begin }, (_, i) => {
        const blockNum = i + begin;
        if (blockNum === 1) return 0;
        for (let j = 2; j <= Math.sqrt(blockNum); j++) {
            if (blockNum % j === 0 && blockNum / j <= 1e7) {
                return blockNum / j;
            }
        }
        return 1;
    });
}
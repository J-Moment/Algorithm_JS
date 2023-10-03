function solution(arr) {
    return arr.reduce((acc, cur) => {
        const recursive = (min, max) => {
            return (min % max) === 0 ? max : recursive(max, min % max);
        }

        let max = 0;
        return acc * cur / recursive(acc, cur);
    });
}

function getGcd(a, b) {
    if (b === 0) return a;
    return getGcd(b, a % b);
}

function solution(arr) {
    return arr.reduce((a, b) => (a * b) / getGcd(a, b));
}
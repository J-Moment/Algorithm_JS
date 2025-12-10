/**
 * @param {number[]} complexity
 * @return {number}
 */
var countPermutations = function(complexity) {
    const MOD = 1000000007;
    const n = complexity.length;

    for (let i = 1; i < n; i++) {
        if (complexity[i] <= complexity[0]) {
            return 0;
        }
    }

    let ans = 1;
    for (let i = 1; i < n; i++) {
        ans = (ans * i) % MOD;
    }

    return ans;
};

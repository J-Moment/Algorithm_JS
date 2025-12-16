/**
 * @param {number} n
 * @param {number[]} present
 * @param {number[]} future
 * @param {number[][]} hierarchy
 * @param {number} budget
 * @return {number}
 */
var maxProfit = function (n, present, future, hierarchy, budget) {
    const g = Array.from({ length: n }, () => []);
    for (let [u, v] of hierarchy) {
        g[u - 1].push(v - 1);
    }

    function dfs(u) {
        const p = present[u];
        const f = future[u];

        let dp0 = Array(budget + 1).fill(-1e15);
        let dp1 = Array(budget + 1).fill(-1e15);
        let dp2 = Array(budget + 1).fill(-1e15);

        dp0[0] = 0;

        if (p <= budget) dp1[p] = f - p;

        const disc = Math.floor(p / 2);

        if (u !== 0 && disc <= budget) dp2[disc] = f - disc;

        for (let v of g[u]) {
            const [c0, c1, c2] = dfs(v);

            let ndp0 = Array(budget + 1).fill(-1e15);
            let ndp1 = Array(budget + 1).fill(-1e15);
            let ndp2 = Array(budget + 1).fill(-1e15);

            for (let pc = 0; pc <= budget; pc++) if (dp0[pc] > -1e14) {
                for (let cc = 0; cc + pc <= budget; cc++) {
                    const best = Math.max(c0[cc], c1[cc]);
                    if (best > -1e14)
                        ndp0[pc + cc] = Math.max(ndp0[pc + cc], dp0[pc] + best);
                }
            }

            for (let pc = 0; pc <= budget; pc++) if (dp1[pc] > -1e14) {
                for (let cc = 0; cc + pc <= budget; cc++) {
                    const best = Math.max(c0[cc], c1[cc], c2[cc]);
                    if (best > -1e14)
                        ndp1[pc + cc] = Math.max(ndp1[pc + cc], dp1[pc] + best);
                }
            }

            for (let pc = 0; pc <= budget; pc++) if (dp2[pc] > -1e14) {
                for (let cc = 0; cc + pc <= budget; cc++) {
                    const best = Math.max(c0[cc], c1[cc], c2[cc]);
                    if (best > -1e14)
                        ndp2[pc + cc] = Math.max(ndp2[pc + cc], dp2[pc] + best);
                }
            }

            dp0 = ndp0;
            dp1 = ndp1;
            dp2 = ndp2;
        }

        return [dp0, dp1, dp2];
    }

    const [A, B, C] = dfs(0);

    let ans = 0;
    for (let i = 0; i <= budget; i++) {
        ans = Math.max(ans, A[i], B[i], C[i]);
    }
    return ans;
};

/**
 * @param {number} n
 * @param {number[][]} buildings
 * @return {number}
 */
var countCoveredBuildings = function(n, buildings) {
    
    const rowMin = new Map();
    const rowMax = new Map();
    const colMin = new Map();
    const colMax = new Map();

    for (const [x, y] of buildings) {
        if (!rowMin.has(x)) {
            rowMin.set(x, y);
            rowMax.set(x, y);
        } else {
            rowMin.set(x, Math.min(rowMin.get(x), y));
            rowMax.set(x, Math.max(rowMax.get(x), y));
        }

        if (!colMin.has(y)) {
            colMin.set(y, x);
            colMax.set(y, x);
        } else {
            colMin.set(y, Math.min(colMin.get(y), x));
            colMax.set(y, Math.max(colMax.get(y), x));
        }
    }

    let covered = 0;
    for (const [x, y] of buildings) {
        const rMin = rowMin.get(x);
        const rMax = rowMax.get(x);
        const cMin = colMin.get(y);
        const cMax = colMax.get(y);

        if (rMin < y && y < rMax && cMin < x && x < cMax) {
            covered++;
        }
    }

    return covered;
};
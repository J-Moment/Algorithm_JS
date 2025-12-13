/**
 * @param {string[]} code
 * @param {string[]} businessLine
 * @param {boolean[]} isActive
 * @return {string[]}
 */
var validateCoupons = function (code, businessLine, isActive) {
  const order = {
    electronics: 0,
    grocery: 1,
    pharmacy: 2,
    restaurant: 3,
  };

  const valid = [];

  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    const b = businessLine[i];
    const active = isActive[i];

    if (!c || !/^[A-Za-z0-9_]+$/.test(c)) continue;

    if (!(b in order)) continue;

    if (!active) continue;

    valid.push([b, c]);
  }

  valid.sort((a, b) => {
    const obA = order[a[0]];
    const obB = order[b[0]];

    if (obA !== obB) return obA - obB;

    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  });

  return valid.map((x) => x[1]);
};

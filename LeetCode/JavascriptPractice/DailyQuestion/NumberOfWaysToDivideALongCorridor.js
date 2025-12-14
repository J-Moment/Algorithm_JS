/**
 * @param {string} corridor
 * @return {number}
 */
var numberOfWays = function (corridor) {
  const MOD = 1000000007;
  let seats = 0;
  let lastSeat = -1;
  let ways = 1;

  for (let i = 0; i < corridor.length; i++) {
    if (corridor[i] === "S") {
      seats++;

      if (seats === 3) {
        const plantsBetween = i - lastSeat - 1;
        ways = (ways * (plantsBetween + 1)) % MOD;
        seats = 1;
      }

      lastSeat = i;
    }
  }

  return seats < 2 ? 0 : ways;
};

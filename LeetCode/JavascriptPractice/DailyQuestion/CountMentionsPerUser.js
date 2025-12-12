/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function (numberOfUsers, events) {
  events.sort((a, b) => {
    const ta = Number(a[1]);
    const tb = Number(b[1]);
    if (ta !== tb) return ta - tb;
    if (a[0] === b[0]) return 0;
    return a[0] === "OFFLINE" ? -1 : 1;
  });

  const mentions = new Array(numberOfUsers).fill(0);
  const online = new Array(numberOfUsers).fill(true);
  const offlineUntil = new Array(numberOfUsers).fill(0);

  for (const [type, tStr, third] of events) {
    const t = Number(tStr);

    for (let u = 0; u < numberOfUsers; u++) {
      if (!online[u] && t >= offlineUntil[u]) {
        online[u] = true;
      }
    }

    if (type === "OFFLINE") {
      const userId = Number(third);
      online[userId] = false;
      offlineUntil[userId] = t + 60;
    } else {
      const s = third;

      if (s === "ALL") {
        for (let u = 0; u < numberOfUsers; u++) {
          mentions[u]++;
        }
      } else if (s === "HERE") {
        for (let u = 0; u < numberOfUsers; u++) {
          if (online[u]) mentions[u]++;
        }
      } else {
        const parts = s.split(" ");
        for (const idStr of parts) {
          if (!idStr) continue;
          const userId = Number(idStr.slice(2));
          if (!Number.isNaN(userId)) {
            mentions[userId]++;
          }
        }
      }
    }
  }

  return mentions;
};

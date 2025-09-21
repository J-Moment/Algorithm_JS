function solution(record) {
  const uidToName = {};
  const events = [];

  for (const rec of record) {
    const [action, uid, nickname] = rec.split(" ");
    if (action === "Enter" || action === "Change") {
      uidToName[uid] = nickname;
    }
    if (action === "Enter" || action === "Leave") {
      events.push([action, uid]);
    }
  }

  const result = events.map(([action, uid]) => {
    const name = uidToName[uid];
    if (action === "Enter") {
      return `${name}님이 들어왔습니다.`;
    } else {
      return `${name}님이 나갔습니다.`;
    }
  });

  return result;
}
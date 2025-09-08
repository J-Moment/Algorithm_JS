function solution(fees, records) {
  let [baseTime, baseFee, unitTime, unitFee] = fees;

  const totalTime = new Map();

  const inRecords = new Map();

  const hoursToMinutes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };

  for (const record of records) {
    const [time, car, state] = record.split(" ");
    const minutes = hoursToMinutes(time);

    if (state === "IN") {
      inRecords.set(car, minutes);
    } else {
      const inTime = inRecords.get(car);
      const parkingTime = minutes - inTime;
      totalTime.set(car, (totalTime.get(car) || 0) + parkingTime);
      inRecords.delete(car);
    }
  }

  // 출차 기록 없는 차량 => 23:59 출차 처리
  for (const [car, inTime] of inRecords) {
    const parkingTime = hoursToMinutes("23:59") - inTime;
    totalTime.set(car, (totalTime.get(car) || 0) + parkingTime);
  }

  const calcFee = (time) => {
    if (time <= baseTime) return baseFee;
    return baseFee + Math.ceil((time - baseTime) / unitTime) * unitFee;
  };
  return [...totalTime.entries()]
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([car, time]) => calcFee(time));
}
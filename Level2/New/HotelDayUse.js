function solution(book_time) {
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const bookings = book_time.map(([start, end]) => [
    toMinutes(start),
    toMinutes(end) + 10,
  ]);

  bookings.sort((a, b) => a[0] - b[0]);

  const rooms = [];

  for (let [start, end] of bookings) {
    let reused = false;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i] <= start) {
        rooms[i] = end;
        reused = true;
        break;
      }
    }
    if (!reused) {
      rooms.push(end);
    }
    rooms.sort((a, b) => a - b);
  }

  return rooms.length;
}
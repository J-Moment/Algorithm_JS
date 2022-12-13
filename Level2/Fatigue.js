function solution(k, dungeons) {
    let answer = 0;
  
    dungeons = dungeons.sort((a, b) => {
      if (b[0] - b[1] === a[0] - a[1]) return b[0] - a[0];
      return b[0] - b[1] - (a[0] - a[1]);
    });
  
    for (let i = 0; i < dungeons.length; i++) {
      let current = dungeons[i];
      if (k < current[0]) {
        return answer;
      }
      k -= dungeons[1];
      answer++;
    }
  
    return answer;
}
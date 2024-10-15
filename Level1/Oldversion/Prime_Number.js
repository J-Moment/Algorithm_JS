function solution(n) {
    const s = new Set();
    for (let i = 2; i <= n; i++) {
      s.add(i);
    }
  
    for (let j = 2; j < Math.sqrt(n); j++) {
      if (s.has(j)) {
        for (let k = j * 2; k <= n; k += j) {
          s.delete(k);
        }
      }
    }
    return s.size;
  }
function solution(n) {
  //dp 배열 선언 시 공간복잡도 상승으로 효율성 실패 나옴
  const mod = 1000000007;

  let a = 1;
  let b = 2;

  if (n === 1) return a;
  if (n === 2) return b;

  for (let i = 2; i < n; i++) {
    result = (a + b) % mod;
    a = b;
    b = result;
  }
  return result;
}
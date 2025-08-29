function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function solution(n, k) {
  let answer = 0;
  let digitNum = n.toString(k);
  let numArr = digitNum.split("0");

  for (let i = 0; i < numArr.length; i++) {
    if (isPrime(Number(numArr[i]))) {
      answer++;
    }
  }
  return answer;
}
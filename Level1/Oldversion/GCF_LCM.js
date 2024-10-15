function divideChocolateStick(M, N) {

    let getGCD = (num1, num2) => (num2 > 0 ? getGCD(num2, num1 % num2) : num1);
    let gcd = getGCD(M, N)
    let result = [];
    for(let i=1; i<=Math.sqrt(gcd); i++){
        if(gcd % i === 0){ 
          result.push([i, M / i, N / i])
          if(i*i<gcd){
            let right = (gcd/i)
            result.push([(gcd/i), M/(gcd/i), N/(gcd/i)])
          }
        }
    }
    result.sort((a, b) => a[0] - b[0]);
  
    return result;
  }
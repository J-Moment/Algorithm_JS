function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
  
    let bridge = [];
    let bridge_sum = 0;
  
    while (answer < 10 && (truck_weights.length > 0 || bridge.length > 0)) {
      answer++;
  
      bridge = bridge.map(([truck, location]) => [truck, location + 1]);
  
      if (bridge.length > 0 && bridge[0][1] > bridge_length) {
        bridge_sum -= bridge.shift()[0];
      }
  
      if (truck_weights.length > 0 && bridge_sum + truck_weights[0] <= weight) {
        let truck = truck_weights.shift();
        bridge.push([truck, 1]);
        bridge_sum += truck;
      }
    }
  
    return answer;
  }
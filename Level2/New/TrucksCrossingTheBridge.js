function solution(bridge_length, weight, truck_weights) {
  let time = 0;
  let bridge = Array(bridge_length).fill(0);
  let current_bridge = 0; // 다리 위 총 무게

  while (truck_weights.length > 0 || current_bridge > 0) {
    time++;

    current_bridge -= bridge.shift();

    if (truck_weights.length > 0) {
      if (current_bridge + truck_weights[0] <= weight) {
        const temp = truck_weights.shift();
        bridge.push(temp);
        current_bridge += temp;
      } else {
        // 못 올라가면 빈 칸, 즉 0을 넣으며 진행
        bridge.push(0);
      }
    } else {
      // 남은 트럭이 없더라도 다리 위 트럭들이 끝까지 빠져나가도록 0으로 채움
      bridge.push(0);
    }
  }

  return time;
}
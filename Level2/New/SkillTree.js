function solution(skill, skill_trees) {
  let constraints = skill.split("");
  let answer = 0;

  skill_trees.forEach((order) => {
    let filteredOrder = order.split("").filter((v) => constraints.includes(v));
    let flag = true;
    for (let i = 0; i < filteredOrder.length; i++) {
      if (constraints[i] !== filteredOrder[i]) {
        flag = false;
        break;
      }
    }
    if (flag) answer++;
  });
  return answer;
}
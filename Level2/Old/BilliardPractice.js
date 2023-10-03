function solution(m, n, startX, startY, balls) {
    var answer = [];

    balls.forEach(item => {
        const [targetX, targetY] = item;
        let min = Infinity;

        if (targetX === startX) {
            min = Math.min(min, (targetX + startX) ** 2 + Math.abs(targetY - startY) ** 2);
            min = Math.min(min, (m + m - targetX - startX) ** 2 + Math.abs(targetY - startY) ** 2);
            if (startY > targetY) {
                min = Math.min(min, Math.abs(targetX - startX) ** 2 + (n + n - targetY - startY) ** 2);
            } else {
                min = Math.min(min, Math.abs(targetX - startX) ** 2 + (targetY + startY) ** 2);
            }
        } else if (targetY === startY) {

            min = Math.min(min, Math.abs(targetX - startX) ** 2 + (n + n - targetY - startY) ** 2);
            min = Math.min(min, Math.abs(targetX - startX) ** 2 + (targetY + startY) ** 2);
            if (startX > targetX) {
                min = Math.min(min, (m + m - targetX - startX) ** 2 + Math.abs(targetY - startY) ** 2);
            } else {
                min = Math.min(min, (targetX + startX) ** 2 + Math.abs(targetY - startY) ** 2);
            }
        } else {

            min = Math.min(min, (targetX + startX) ** 2 + Math.abs(targetY - startY) ** 2);
            min = Math.min(min, (m + m - targetX - startX) ** 2 + Math.abs(targetY - startY) ** 2);
            min = Math.min(min, Math.abs(targetX - startX) ** 2 + (n + n - targetY - startY) ** 2);
            min = Math.min(min, Math.abs(targetX - startX) ** 2 + (targetY + startY) ** 2);
        }
        answer.push(min);
    });


    return answer;
}
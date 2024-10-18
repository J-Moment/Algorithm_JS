function solution(triangle) {
    const height = triangle.length;
    const memo = [...Array(height)].map((x,i) => [...Array(i + 1)].fill(0));
    
    triangle[height -1].forEach((value, index) => memo[height -1][index] = value);

    for (let i = height - 2; i >=0; i--) {
        for(let j = 0; j <= i; j++){
            memo[i][j] = triangle[i][j] + Math.max(memo[i + 1][j],
                                                   memo[i + 1][j + 1]);
        }
    }

    const answer = memo[0][0];
   return answer;
}
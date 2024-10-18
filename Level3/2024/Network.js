function solution(n, computers) {
    const visited = Array.from({length: n}, () => 0);
    let answer = 0;
 
    for (let i=0; i<n; i++){
        if(!visited[i]){
            dfs(i);
            answer++;
        }
    }
 
    function dfs(node){
        visited[node] = 1;
        for(let i=0; i<n; i++){
            if(computers[node][i] && !visited[i]){
                dfs(i);
            }
        }
    }
 
    return answer;
}
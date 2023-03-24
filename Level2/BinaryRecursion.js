function solution(s) {
    let origin; // 기존의 s 길이
    let contract; // 0 제거된 후의 s 길이
    let acc = 0; // 누적 값
    let cnt = 0; // 반복 회차

    while (s !== "1") {
        origin = s.length;

        //0 제거
        s = s.replaceAll(0, "");
        contract = s.length;
        acc += (origin - contract);

        //s의 이진 변환된 길이를 s에 다시 저장
        s = contract.toString(2);
        cnt++;
    }

    return [cnt, acc];
}
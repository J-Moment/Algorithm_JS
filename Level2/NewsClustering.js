function solution(str1, str2) {
    var answer = 0;
    let arr1 = [];
    let arr2 = [];

    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    let tmp = "";
    for (let i = 0; i < str1.length - 1; i++) {
        tmp = "";
        tmp += str1[i];
        tmp += str1[i + 1];
        if (isAlpha(str1[i]) && isAlpha(str1[i + 1])) {
            arr1.push(tmp);
        }

    }

    for (let i = 0; i < str2.length - 1; i++) {
        tmp = "";
        tmp += str2[i];
        tmp += str2[i + 1];
        if (isAlpha(str2[i]) && isAlpha(str2[i + 1])) {
            arr2.push(tmp);
        }
    }
    let arrCopy = [...arr2];
    let union = [];
    let intersection = [];

    //교집합 구하기
    for (let i = arr1.length - 1; i >= 0; i--) {
        for (let j = arr2.length - 1; j >= 0; j--) {
            if (arr1[i] === arr2[j]) {
                intersection.push(arr1[i]);
                arr1.splice(i, 1);
                arr2.splice(j, 1);
                if (i === arr1.length - 1) {
                    i--;
                }
            }
        }
    }

    //합집합 구하기
    union.push(...arr1);
    union.push(...arrCopy);

    console.log(intersection);
    console.log(union);


    if (union.length === 0 && intersection.length === 0) {
        answer = 1;
    }
    else {
        answer = intersection.length / union.length;
    }

    return Math.floor(answer * 65536);
}

function isAlpha(c) {
    if (c <= 'z' && c >= 'a') {
        return true;
    }
    else {
        return false;
    }
}
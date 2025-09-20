function solution(files) {
  return files.sort((a, b) => {
    const reg = /^([a-zA-Z-.\s]+)(\d{1,5})(.*)$/;

    const [, headA, numA] = a.match(reg);
    const [, headB, numB] = b.match(reg);

    const headCompare = headA.toLowerCase().localeCompare(headB.toLowerCase());
    if (headCompare !== 0) return headCompare;

    const numberCompare = parseInt(numA) - parseInt(numB);
    if (numberCompare !== 0) return numberCompare;

    return 0;
  });
}

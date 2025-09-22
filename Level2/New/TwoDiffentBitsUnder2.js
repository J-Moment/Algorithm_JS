function solution(numbers) {
  return numbers.map((el) => {
    if (!(el % 2)) return el + 1;
    const binary = "0" + el.toString(2);
    const idx = binary.lastIndexOf("0");
    return parseInt(
      binary.substring(0, idx) + "10" + binary.substring(idx + 2),
      2
    );
  });
}

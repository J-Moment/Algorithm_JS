function solution(n) {
	return String(n).split('').reduce((a, b) => a + b * 1, 0);
}
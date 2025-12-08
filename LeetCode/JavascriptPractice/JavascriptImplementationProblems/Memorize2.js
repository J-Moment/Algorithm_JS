/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const cache = new Map();
  const RESULT = Symbol("result");

  return function (...args) {
    let node = cache;

    for (const arg of args) {
      if (!node.has(arg)) {
        node.set(arg, new Map());
      }
      node = node.get(arg);
    }

    if (node.has(RESULT)) {
      return node.get(RESULT);
    }

    const result = fn(...args);
    node.set(RESULT, result);
    return result;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *   callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 (같은 숫자 인자 -> 같은 참조 키로 캐시 히트)
 */

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
  return new Promise((resolve, reject) => {
    const n = functions.length;
    if (n === 0) {
      resolve([]);
      return;
    }

    const results = new Array(n);
    let completedCount = 0;

    functions.forEach((fn, index) => {
      Promise.resolve()
        .then(() => fn())
        .then((value) => {
          results[index] = value;
          completedCount += 1;
          if (completedCount === n) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */

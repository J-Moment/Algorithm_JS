/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
var cancellable = function (generator) {
  let finished = false;
  let step;

  const promise = new Promise((resolve, reject) => {
    step = (method, arg) => {
      if (finished) return;

      let next;
      try {
        next = method.call(generator, arg);
      } catch (err) {
        finished = true;
        reject(err);
        return;
      }

      if (next.done) {
        finished = true;
        resolve(next.value);
        return;
      }

      Promise.resolve(next.value).then(
        (val) => step(generator.next, val),
        (err) => step(generator.throw, err)
      );
    };

    step(generator.next, undefined);
  });

  const cancel = () => {
    if (finished) return;
    step(generator.throw, "Cancelled");
  };

  return [cancel, promise];
};

/**
 * function* tasks() {
 *   const val = yield new Promise(resolve => resolve(2 + 2));
 *   yield new Promise(resolve => setTimeout(resolve, 100));
 *   return val + 1;
 * }
 * const [cancel, promise] = cancellable(tasks());
 * setTimeout(cancel, 50);
 * promise.catch(console.log); // logs "Cancelled" at t=50ms
 */

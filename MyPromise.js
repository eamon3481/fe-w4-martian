const PENDING = "pending";
const RESOLVED = "resolved";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
// from Neis
export default class MyPromise {
  constructor(cb) {
    this.state = PENDING;
    this.next;
    this.onFulfilled;
    this.onRejected;
    this.onCatched;
    this.onFinally;

    if (cb)
      setTimeout(() => cb(this.resolve.bind(this), this.reject.bind(this)), 0);
  }

  then(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
    return (this.next = new MyPromise());
  }

  resolve(result) {
    this.state = RESOLVED;

    if (result instanceof MyPromise)
      result.then((innerResult) =>
        this.internalFulfilled.call(this, innerResult)
      );
    else this.internalFulfilled.call(this, result);
  }

  reject(result) {
    this.state = RESOLVED;
    this.internalRejected(result);
  }

  catch(onCatched) {
    this.onCatched = onCatched;
    return (this.next = new MyPromise());
  }

  finally(result) {
    // TODO
  }

  internalFulfilled(result) {
    setTimeout(() => {
      try {
        const fulfilledResult = this.onFulfilled(result);

        if (this.next) this.next.resolve(fulfilledResult);
      } catch (err) {
        this.internalCatched(err);
      } finally {
        this.state = FULFILLED;
      }
    }, 0);
  }

  internalRejected(result) {
    setTimeout(() => {
      try {
        if (result instanceof Error) throw result;

        const rejectedResult = this.onRejected(result);

        if (this.next) this.next.reject(rejectedResult);
      } catch (err) {
        this.internalCatched(err);
      } finally {
        this.state = REJECTED;
      }
    }, 0);
  }

  internalCatched(err) {
    setTimeout(() => {
      const onCatchedPromise = this.closestOnCatchedPromise();

      if (!onCatchedPromise) return;

      const handledResult = onCatchedPromise.onCatched(err);

      if (handledResult && onCatchedPromise.next)
        onCatchedPromise.next.resolve(handledResult);
    }, 0);
  }

  closestOnCatchedPromise() {
    if (this.onCatched) return this;
    else if (this.next) return this.next.closestOnCatchedPromise();

    return null;
  }
}

/*
const testPromise = new MyPromise((res, rej) => {
  res("안녕하신가.");
});
console.log(testPromise);
testPromise
  .then((value) => {
    console.log(value);
    return value + "?";
  })
  .then((v) => {
    console.log(v);
  });

console.log("start")

 new MyPromise((resolve, reject) => {
     setTimeout(() => {
         resolve("hello");
     }, 1000);
})
     .then((v) => v + ' world')
     .then((v) => console.log(v + ' and crong'))

 console.log("end")
*/

const cb1 = () =>
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      console.log("cb1 5초");
      resolve("cb1");
    }, 5000);
  });

const cb2 = (v) =>
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      console.log(v + " -> cb2 10초");
      resolve(v + " -> cb2");
    }, 5000);
  });

const cb3 = (v) =>
  new MyPromise((resolve, reject) => {
    setTimeout(() => {
      console.log(v + " -> cb3 8초");
      resolve(v + " -> cb3");
    }, 3000);
  });

const cb4 = (v) =>
  setTimeout(() => {
    console.log(v + " -> cb4");
    return v + " -> cb4";
  }, 2000);

cb1().then(cb2).then(cb3).then(cb4);

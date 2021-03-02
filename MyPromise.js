class MyPromise {
  constructor(initialStr) {
    this.cbList = [];

    setTimeout(() => {
      this.cbList.reduce((acc, func) => func(acc), initialStr);
    }, 100);
  }

  then(cb) {
    this.cbList.push(cb);
    return this;
  }
}

console.log("start");

new MyPromise("hello")
  .then((v) => v + " world")
  .then((v) => v + " and crong")
  .then((v) => console.log(v));
  
console.log("end");

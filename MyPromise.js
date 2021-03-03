class MyPromise {
  constructor(callback) {
    callback(this.resolve.bind(this), this.reject.bind(this));
    this.cbList = [];
  }

  resolve(input) {
    console.log('resolve 호출')
    this.cbList.reduce((acc, cur) => cur(acc), input)
}

reject(input) {
    console.log('reject 호출')
}

then(cb) {
    console.log(this.cbList.length)
    this.cbList.push(cb)
    return this;
}
}

console.log("start")

 new MyPromise((resolve, reject) => {
     setTimeout(() => {
         resolve("hello");
     }, 1000);
})
     .then((v) => v + ' world')
     .then((v) => console.log(v + ' and crong'))

 console.log("end")


const charToCode = (char) => char.charCodeAt(0).toString(16).toUpperCase();

const codeTochar = (code) => String.fromCharCode('0x' + code);


console.log(codeTochar(charToCode('J')));
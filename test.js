function test() {
  const array = [
    ["A", "0"],
    ["c", "3"],
    ["1", "3"],
  ];
  // (1) test를 async로 감싸는 대신, for문을 async 즉시실행함수로 감싸도 된다
  const delay = (array) => {
    return new Promise((res) =>
      setTimeout(() => {
        for (let j = 0, f = Promise.resolve(); j < array.length; j++) {
          f = f.then(
            (_) =>
              new Promise((resolve) =>
                setTimeout(function () {
                  console.log(array[j]);
                  resolve();
                }, 1000)
              )
          );
        }
        res();
      }, 1000)
    );
  };

  for (let i = 0, p = Promise.resolve(); i < array.length; i++) {
    p = p
      .then(
        (_) =>
          new Promise((resolve) =>
            setTimeout(function () {
              resolve(array[i]);
            }, 1000)
          )
      )
      .then((array) => delay(array));
  }
}
/*
[1, 2, 3, 4, 5, 6, 7].reduce(
  (pending, curr) =>
    pending.then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(curr);
          resolve();
        }, 1000);
      });
    }),
  Promise.resolve()
);*/
const array = [1, 2, 3, 4, 5, 6, 7];

let p = Promise.resolve();
for (let i of array) {
  p = p.then(
    (_) =>
      new Promise((resolve) =>
        setTimeout(function () {
          console.log(i);
          resolve();
        }, 1000)
      )
  );
}


(async function foo() {
 for (let v of data) {
    await new Promise( (resolve) => {
        setTimeout(()=> {
           resolve(v);
        }, 2000);
   })
   console.log(v);
 }
})();

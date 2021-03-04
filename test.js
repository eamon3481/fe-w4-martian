function delay(code) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(code);
      resolve();
    }, 2000);
  });
}

const array = [
  ["A", "0"],
  ["c", "3"],
  ["1", "3"],
];

function test() {
  const promiseFunction = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("w");
        resolve("result");
      }, 1000)
    );

  const array = [
    ["A", "0"],
    ["c", "3"],
    ["1", "3"],
  ];
  // (1) test를 async로 감싸는 대신, for문을 async 즉시실행함수로 감싸도 된다

  const cd = () => {
    for (let i = 0, p = Promise.resolve(); i < 2; j++) {
      p = p // --- ⑤ // --- ⑥
        .then(() => {
          setTimeout(() => {
            console.log("w");
            resolve("result");
          }, 1000);
        });
    }
  };

  for (let j = 0, pending = Promise.resolve(); j < 3; j++) {
    // --- ①
    pending = pending // --- ⑤ // --- ⑥
      .then(() => {
        // --- ②
        return new Promise((resolve) => {
          resolve(()=> cd()); // --- ③
        });
      });
    console.log("pending", pending); //pending 값도 체크해보자.
  }

  /*
    (async () => {
      	// (2) forEach 대신 for ... of를 사용한다
        for(let i=0; i<3; i++){
        for (let element of array[i]) {
            const result = await promiseFunction();
            console.log(element);
        }
        console.log(" ");
    }
    })();

}
*/
}
test();

/*
arr.reduce(async (prevProm, item) => {
  await prevProm;
  return prevProm.then(item);
}, Promise.resolve());


*/

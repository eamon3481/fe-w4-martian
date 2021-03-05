import _ from "./utils/utils.js";
import dom from "./utils/DOMselecter.js";
import MyPromise from "./utils/MyPromise.js";
import { getCode, MakeCodeKey } from "./ASCcode.js";


const rotatingPlate = (code) => {
  let transition = arrow.style.transform.replace(/[a-z()]/g, "");
  dom.arrow.style.transform = `rotate(${code}deg)`;
};

const codeSplit = (nums) => {
  nums.forEach((v) => v.classList.add("font"));
  new Promise((resolve) =>
    setTimeout(() => {
      nums.forEach((v) => v.classList.remove("font"));
      resolve();
    }, 1000)
  );
};
const delay = (time) =>
new Promise((resolve) =>
  setTimeout(() => {
    resolve();
  }, time)
);

const forEachPromise = (array) => {
 
  (async () => {
    for (let i = 0; i < array.length; i++) {
      for (let element of array[i]) {
        rotatingPlate(element);
        const result = await delay(4000);
      }
        this.then(codeSplit(dom.nums));
    }
  })();
};

const activeBtnEvent = new MyPromise((resolve, reject) => {
  _.on(dom.outgoing, "click", ({ target }) => {
    if (target.className === "outgoing_btn" && input.value) {
      resolve(input.value);
    }
  });
});

const ForEachData = (codes) => forEachPromise(codes);

const ParseCode = (codes) => {
  const codekey = MakeCodeKey(11.25);
  let rotateList = [];
  codes.forEach((code) => {
    code.forEach((c) => rotateList.push(c.map((code) => codekey[code])));
  });
  return rotateList;
};




activeBtnEvent //
  .then(getCode) //
  .then(ParseCode)
  .then(ForEachData);

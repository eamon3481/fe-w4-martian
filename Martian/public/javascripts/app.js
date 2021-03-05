import _ from "./utils/utils.js";
import dom from "./utils/DOMselecter.js";
import MyPromise from "./utils/MyPromise.js";
import { getCode, MakeCodeKey } from "./ASCcode.js";

const Blink = () => {};

const rotatingPlate = (code) => {
  let transition = dom.arrow.style.transform.replace(/[a-z()]/g, "");
  dom.arrow.style.transform = `rotate(${code}deg)`;
};

const codeSplit = (nums) => {
    nums.forEach((v) => v.classList.add("font"));
    return _.delay(500);
}

const forEachPromise = (array) => {
  (async () => {
    for (let i = 0; i < array.length; i++) {
      for (let element of array[i]) {
        rotatingPlate(element);
        const result = await _.delay(4000);
      }
      await codeSplit(dom.nums);
      dom.nums.forEach((v) => v.classList.remove("font"));
    }
  })();
};

const activeBtnEvent = new MyPromise((resolve, reject) => {
  _.on(dom.outgoing, "click", ({ target }) => {
    if (target.className === "outgoing_btn" && dom.input.value) {
      resolve(dom.input.value);
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

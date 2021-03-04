import _ from "./utils/utils.js";
import MyPromise from "./utils/MyPromise.js";
import { getCode, MakeCodeKey } from "./ASCcode.js";
const section = _.$("section");
const outgoing = _.$(".outgoing", section);
const input = _.$(".outgoing_str", outgoing);
const arrow = _.$(".arrow", section);
const nums = _.$A(".code", section);

const rotatingPlate = (code) => {
  let transition = arrow.style.transform.replace(/[a-z()]/g, "");
  arrow.style.transform = `rotate(${code}deg)`;
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

const forEachPromise = (array) => {
  const delay = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 4000)
    );
  (async () => {
    for (let i = 0; i < array.length; i++) {
      for (let element of array[i]) {
        rotatingPlate(element);
        const result = await delay();
      }
      await codeSplit(nums);
    }
  })();
};

const activeBtnEvent = new MyPromise((resolve, reject) => {
  _.on(outgoing, "click", ({ target }) => {
    if (target.className === "outgoing_btn" && input.value) {
      resolve(input.value);
    }
  });
});

const ForEachData = (codes) => {
  forEachPromise(codes);
};

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

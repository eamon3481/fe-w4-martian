import _ from "./utils/utils.js";
import dom from "./utils/DOMselecter.js";
import { MakeCodeKey } from "./ASCcode.js";
const rotatingPlate = (code) => {
  let transition = dom.arrow.style.transform.replace(/[a-z()]/g, "");
  dom.arrow.style.transform = `rotate(${code}deg)`;
};

const ParseCode = (codes) => {
  const deg = 360 / 16;
  const codekey = MakeCodeKey(deg / 2);
  let rotateList = [];
  codes.forEach((code) => {
    code.forEach((c) => rotateList.push(c.map((code) => codekey[code])));
  });
  return rotateList;
};

const codeSplit = (nums) => {
  nums.forEach((v) => v.classList.add("font"));
  return _.delay(500);
};

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

const ForEachData = (codes) => forEachPromise(codes);

export { ParseCode, ForEachData };

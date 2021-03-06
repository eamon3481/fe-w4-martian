import _ from "./utils/utils.js";
import dom from "./utils/DOMselecter.js";
import { CodeKey } from "./ASCcode.js";
const degToCode = (deg) =>
  Object.keys(CodeKey).find((key) => CodeKey[key] === deg);

const Blink = (code) => {
  const DomNum = _.$(`#_${code}`);
  DomNum.classList.add("font");
  const del = () =>
    new Promise((res) =>
      setTimeout(() => {
        DomNum.classList.add("font");
        res();
      }, 1000)
    );
  return del().then(()=>(DomNum.classList.remove("font")));
};

const rotatingPlate = (deg) => {
  dom.arrow.style.transform = `rotate(${deg}deg)`;
};

const ParseCode = (codes) => {
  let rotateList = [];
  codes.forEach((code) => {
    code.forEach((c) => rotateList.push(c.map((code) => CodeKey[code])));
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
        const result = await _.delay(2000);
        await Blink(degToCode(element));
        await _.delay(1000);
      }
      await codeSplit(dom.nums);
      dom.nums.forEach((v) => v.classList.remove("font"));
    }
  })();
};

const ForEachData = (codes) => forEachPromise(codes);

export { ParseCode, ForEachData };

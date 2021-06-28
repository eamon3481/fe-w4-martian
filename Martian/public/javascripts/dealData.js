import _ from "./utils/utils.js";
import dom from "./utils/DOMselecter.js";
import { CodeKey } from "./ASCcode.js";
const degToCode = (deg) =>
  Object.keys(CodeKey).find((key) => CodeKey[key] === deg);

const codeFinish = () =>
  new Promise((res) => {
    let currTEXT = dom.message.innerHTML;
    dom.message.innerHTML = currTEXT.slice(0,-1)
    dom.arrow.style.transform = `rotate(0deg)`;
    dom.btn.disabled = false;
    res();
  });

const printCode = (code) => {
  const currTEXT = dom.message.innerHTML;
  dom.message.innerHTML = currTEXT + code;
};

const blinkNumber = (code) => {
  const DomNum = _.$(`#_${code}`);
  DomNum.classList.add("font");
  const delay = () =>
    new Promise((res) =>
      setTimeout(() => {
        res(code);
        DomNum.classList.add("font");
      }, 1000)
    );
  return delay()
    .then(printCode)
    .then(() => DomNum.classList.remove("font"));
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
  const currTEXT = dom.message.innerHTML;
  dom.message.innerHTML = currTEXT + " ";
  return _.delay(500);
};

const forEachPromise = (array) => {
  (async () => {
    for (let i = 0; i < array.length; i++) {
      for (let element of array[i]) {
        rotatingPlate(element);
        const result = await _.delay(2000);
        await blinkNumber(degToCode(element));
        await _.delay(1000);
      }
      await codeSplit(dom.nums);
      dom.nums.forEach((v) => v.classList.remove("font"));
    }
    await codeFinish();
  })();
};

const ForEachData = (codes) => forEachPromise(codes);

export { ParseCode, ForEachData };

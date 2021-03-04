import _ from "./utils/utils.js";
import MyPromise from "./utils/MyPromise.js";
import { getCode, MakeCodeKey } from "./ASCcode.js";
const section = _.$("section");
const outgoing = _.$(".outgoing", section);
const input = _.$(".outgoing_str", outgoing);
const arrow = _.$(".arrow", section);

function delay(item, time, cb) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      cb(item);
      resolve();
    }, time);
  });
}

async function ForEachPromise(array, time, cb) {
  for (let i = 0; i < array.length; i++) {
    await delay(array[i], time, cb);
  }
  console.log("Done");
}

const rotatingPlate = (code) => {
  let transition = arrow.style.transform.replace(/[a-z()]/g, "");
  arrow.style.transform = `rotate(${code}deg)`;
};

const activeBtnEvent = new MyPromise((resolve, reject) => {
  _.on(outgoing, "click", ({ target }) => {
    if (target.className === "outgoing_btn" && input.value) {
      resolve(input.value);
    }
  });
});

const ForEachData = (codes) => {
  const test = ["20", "30", "110"];
  ForEachPromise(test, 3000, rotatingPlate);
  //ForEachPromise(codes, 0, (code) => ForEachPromise(code, 3000, (c)=> rotatingPlate(c)));
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

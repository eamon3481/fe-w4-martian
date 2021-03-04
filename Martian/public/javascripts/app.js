import _ from "./utils/utils.js";
import MyPromise from "./utils/MyPromise.js";
import { getCode } from "./ASCcode.js";
const section = _.$("section");
const outgoing = _.$(".outgoing", section);
const input = _.$(".outgoing_str", outgoing);

const activeBtnEvent = new MyPromise((resolve, reject) => {
  _.on(outgoing, "click", ({ target }) => {
    if (target.className === "outgoing_btn" && input.value) {
      resolve(input.value);
    }
  });
});

const MakeCodeKey = (deg) => {
  const codeKey = {};
  const keys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  keys.forEach((key, i) => {
    codeKey[key] = deg * (2 * i + 1);
  });
  return codeKey;
};
const rotatingPlate = (codekey, code) => {
  
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
  .then(ParseCode);

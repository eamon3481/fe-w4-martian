import _ from "./utils/utils.js";
import dom from "./utils/DOMselecter.js";
import MyPromise from "./utils/MyPromise.js";
import { ParseCode, ForEachData } from "./dealData.js";
import { getCode, codeToChar } from "./ASCcode.js";

const pipe = (...funcs) => (v) => {
  return funcs.reduce((res, func) => {
    return func(res);
  }, v);
};

const init = () => {
  dom.mode.innerHTML = `<span>지구 > 화성</span>`;
  const intString = "hello";
  pipe(getCode, ParseCode, ForEachData)(intString);

  _.on(dom.section, "click", ({ target }) => {
    if (target.className === "outgoing_btn" && dom.input.value) {
      dom.message.innerHTML = "";
      new Promise((res) => {
        dom.mode.innerHTML = `<span>화성 > 지구</span>`;
        res(dom.input.value);
      })
        .then(getCode) //
        .then(ParseCode)
        .then(ForEachData);
    } else if (target.className === "btn") {
      const code = dom.message.innerHTML
        .split(" ")
        .map((e) => codeToChar(e))
        .join("");
      dom.message.innerHTML = code;
      dom.btn.disabled = true;
      dom.input.value = "";
    }
  });
};

init();

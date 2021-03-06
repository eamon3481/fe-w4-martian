import _ from "./utils/utils.js";
import dom from "./utils/DOMselecter.js";
import MyPromise from "./utils/MyPromise.js";
import { ParseCode, ForEachData } from "./dealData.js";
import { getCode, codeToChar } from "./ASCcode.js";

const init = () => {
  _.on(dom.section, "click", ({ target }) => {
    if (target.className === "outgoing_btn" && dom.input.value) {
        dom.message.innerHTML = '';
      new Promise((res) => {
        res(dom.input.value);
      })
        .then(getCode) //
        .then(ParseCode)
        .then(ForEachData);
    } else if (target.className === "btn") {
      const code = dom.message.innerHTML.split(" ").map((e) => codeToChar(e)).join('');
      dom.message.innerHTML = code;
      dom.btn.disabled = true;
      dom.input.value = '';
    }
  });
};

init();

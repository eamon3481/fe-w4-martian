import _ from "./utils/utils.js";
import dom from "./utils/DOMselecter.js";
import MyPromise from "./utils/MyPromise.js";
import { ParseCode, ForEachData } from "./dealData.js";
import { getCode } from "./ASCcode.js";



const activeBtnEvent = new MyPromise((resolve, reject) => {
  _.on(dom.outgoing, "click", ({ target }) => {
    if (target.className === "outgoing_btn" && dom.input.value) {
      resolve(dom.input.value);
    }
  });
});

activeBtnEvent //
  .then(getCode) //
  .then(ParseCode)
  .then(ForEachData);

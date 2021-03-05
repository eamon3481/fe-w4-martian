import _ from "./utils.js";
const DOM = {
  section: _.$("section"),
  outgoing: _.$(".outgoing", section),
  input: _.$(".outgoing_str", outgoing),
  arrow: _.$(".arrow", section),
  nums: _.$A(".code", section)
};

export default DOM;

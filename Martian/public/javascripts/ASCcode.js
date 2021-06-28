const charToCode = (char) => char.charCodeAt(0).toString(16).toUpperCase();

const codeToChar = (code) => String.fromCharCode("0x" + code);

const getCode = (str) => str.split("").map((e) => charToCode(e).split(",").map((e) => e.split("")));


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


const deg = 360 / 16;
const CodeKey = MakeCodeKey(deg/2);

export { codeToChar, charToCode, getCode, CodeKey };

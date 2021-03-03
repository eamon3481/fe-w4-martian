const charToCode = (char) => char.charCodeAt(0).toString(16).toUpperCase();

const codeTochar = (code) => String.fromCharCode('0x' + code);

const getCode = (str) => str.split("").map(e => charToCode(e).split(",").map(e => e.split("")));

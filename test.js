
let defaultSettings = {
  height: 11,
  width: 20
};

let settings = Object.assign({}, defaultSettings);

defaultSettings.width = 10;

console.log(defaultSettings);
console.log(settings);

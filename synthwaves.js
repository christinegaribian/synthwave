const Synth = require("./lib/synth");
const KeyboardAnimation = require("./lib/keyboardAnimation");

document.addEventListener("DOMContentLoaded", function(){
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);
  const synth = new Synth(keyboard);


});

const Synth = require("./lib/synth");
const keyboardAnimation = require("./lib/keyboardAnimation");
document.addEventListener("DOMContentLoaded", function(){
  const keyboard = document.getElementById("keyboard");
  const keyboardAnim = new keyboardAnimation(keyboard);
  const synth = new Synth(keyboard);


});

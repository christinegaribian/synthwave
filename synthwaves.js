const KeyboardAnimation = require("./lib/keyboardAnimation");
const Synth = require("./lib/synth");
const Bird = require("./lib/bird");

document.addEventListener("DOMContentLoaded", function(){
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  // const synth = new Synth(keyboard);
  const bird = new Bird(keyboard);


});

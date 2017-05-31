const KeyboardAnimation = require("./lib/keyboardAnimation");
const Synth = require("./lib/synth");
const Bird = require("./lib/bird");

document.addEventListener("DOMContentLoaded", function(){
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);
  const selected_sound = document.getElementById("sounds");
  let chosenInstrument = null;

  selected_sound.onchange = (e) => {
    const options = e.srcElement.options;
    const chosenInstrumentName = options[options.selectedIndex].innerHTML;
    if(chosenInstrument){
      chosenInstrument.destroy();
    }

    switch(chosenInstrumentName){
      case 'Computer-Generated Synth':
        return chosenInstrument = new Synth();
      case 'Bird':
        return chosenInstrument = new Bird();
    }
  }

  window.AudioContext = window.AudioContext || window.webkitAudioContext;


  // const synth = new Synth();
  // const bird = new Bird();


});

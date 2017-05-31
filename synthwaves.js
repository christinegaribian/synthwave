const KeyboardAnimation = require("./lib/keyboardAnimation");
const Synth = require("./lib/synth");
const Bird = require("./lib/bird");

document.addEventListener("DOMContentLoaded", function(){
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);
  const selected_sound = document.getElementById("sounds");

  selected_sound.onchange = (e) => {
    const options = e.srcElement.options;
    const chosenInstrumentName = options[options.selectedIndex].innerHTML;
    if(chosenInstrument){
      chosenInstrument.destroy
    }

    const chosenInstrument = null;
    switch(chosenInstrumentName){
      case 'Computer-Generated Synth':
        return new Synth();
      case 'Bird':
        // const bird = new Bird();
        return new Bird();
    }
  }

  window.AudioContext = window.AudioContext || window.webkitAudioContext;


  // const synth = new Synth();
  // const bird = new Bird();


});

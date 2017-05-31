const KeyboardAnimation = require("./lib/keyboardAnimation");
const Synth = require("./lib/synth");
const Audio = require("./lib/audio");

document.addEventListener("DOMContentLoaded", function(){
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  // const selected_sound = document.getElementById("sounds");
  // let chosenInstrument = null;


  // selected_sound.onchange = (e) => {
  //   const options = e.srcElement.options;
  //   const chosenInstrumentName = options[options.selectedIndex].innerHTML;
  //   if(chosenInstrument){
  //     chosenInstrument.destroy();
  //   }
  //
  //   switch(chosenInstrumentName){
  //     case 'Computer-Generated Synth':
  //       return chosenInstrument = new Audio();
  //     case 'Bird':
  //       return chosenInstrument = new Bird();
  //   }
  // }



  const synth = new Synth();
  // const bird = new Bird();


});

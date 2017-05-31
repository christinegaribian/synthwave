const KeyboardAnimation = require("./lib/keyboardAnimation");
const Synth = require("./lib/synth");
const Audio = require("./lib/audio");

document.addEventListener("DOMContentLoaded", function(){
  // Keyboard Animation
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);

  // Audio
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const selectedSound = document.getElementById("sounds");
  let chosenInstrument = new Synth({isPluckySound: true});

  selectedSound.onchange = (e) => {
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
      case 'Plucky Synth':
        return chosenInstrument = new Synth({isPluckySound: true});
    }
  }

  // Audio Visualization
  window.canvas = document.getElementById("visualization");
  window.canvasContext = canvas.getContext("2d");

  // let chosenVisualization = new Visualization({isPluckySound: true});
  //
  // selectedVisualization.onchange = (e) => {
  //   const options = e.srcElement.options;
  //   const chosenVisualizationName = options[options.selectedIndex].innerHTML;
  //   if(chosenVisualization){
  //     chosenVisualization.destroy();
  //   }
  //
  //   switch(chosenVisualizationName){
  //     case 'Computer-Generated Synth':
  //       return chosenVisualization = new Synth();
  //     case 'Bird':
  //       return chosenVisualization = new Bird();
  //     case 'Plucky Synth':
  //       return chosenVisualization = new Synth({isPluckySound: true});
  //   }
  // }

});

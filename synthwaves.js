const KeyboardAnimation = require("./lib/keyboardAnimation");
const Synth = require("./lib/synth");
const Audio = require("./lib/audio");
const INSTRUMENTS = ['synth', 'plucky', 'bird'];
document.addEventListener("DOMContentLoaded", function(){
  // Keyboard Animation
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);

  // Audio
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const selectedSound = document.getElementById("sounds");
  const selectedVisualization = document.getElementById("visuals");
  // Audio Visualization
  window.canvas = document.getElementById("visualization");
  window.canvasContext = canvas.getContext("2d");



  let chosenInstrument;
  //  = new Synth({visualizer: 'wavelength', isPluckySound: true});
  let visualizer;
  let chosenInstrumentName;

  selectedSound.onchange = (e) => {
    if(e.target.id == 'visuals'){
      console.log(e.target.id);
      visualizer = e.target.value;
      if(INSTRUMENTS.includes(chosenInstrumentName)){
        chosenInstrument.destroy();
      }
    } else {
      visualizer = selectedVisualization
                  .options[selectedVisualization.selectedIndex]
                  .innerHTML.toLowerCase();
      if (!['frequency', 'wavelength'].includes(visualizer)){
        visualizer = 'wavelength';
      }
      chosenInstrumentName = e.target.value;
      console.log(chosenInstrumentName);


    }

    switch(chosenInstrumentName){
      case 'synth':
        return chosenInstrument = new Synth({visualizer: visualizer, isPluckySound: false});
      case 'bird':
        return chosenInstrument = new Bird();
      case 'plucky':
        return chosenInstrument = new Synth({visualizer: visualizer, isPluckySound: true});
      default:
        return chosenInstrument = new Synth({visualizer: 'wavelength', isPluckySound: true});
    }
  }

  selectedVisualization.onchange = (e) => {
    selectedSound.onchange(e);
  }



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

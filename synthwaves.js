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
  const selectedVisualization = document.getElementById("visuals");
  // Audio Visualization
  window.canvas = document.getElementById("visualization");
  window.canvasContext = canvas.getContext("2d");



  let chosenInstrument = new Synth();
  let visualizer;

  selectedSound.onchange = (e) => {
    if(e.target.id == 'visuals'){
      visualizer = e.target.value;
    } else {
      // visualizer = 'wavelength';
      visualizer = selectedVisualization
                  .options[selectedVisualization.selectedIndex]
                  .innerHTML.toLowerCase();
                  console.log(visualizer);
      // console.log(selectedVisualization.options[selectedVisualization.selectedIndex]);
      if (!['frequency', 'wavelength'].includes(visualizer)){
        visualizer = 'frequency';
      }
    }
    const chosenInstrumentName = e.target.value;
    if(chosenInstrument){
      chosenInstrument.destroy();
    }

    switch(chosenInstrumentName){
      case 'synth':
        return chosenInstrument = new Synth(visualizer, false);
      case 'bird':
        return chosenInstrument = new Bird();
      case 'plucky':
        return chosenInstrument = new Synth(visualizer);
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

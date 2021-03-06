const KeyboardAnimation = require("./lib/keyboardAnimation");
const Synth = require("./lib/synth");
const BIRDS = require("./lib/birds");
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

  let chosenInstrument = new Audio({
    sounds: BIRDS['BIRD_SOUNDS'], 
    visualizer: 'frequency'
  });

  let visualizer;
  let chosenInstrumentName = 'bird';
  selectedSound.onchange = (e) => {
    if(e.target.id == 'visuals'){
      visualizer = e.target.value;
    } else {
      visualizer = selectedVisualization
                  .options[selectedVisualization.selectedIndex]
                  .innerHTML.toLowerCase();
      if (!['frequency', 'wavelength'].includes(visualizer)){
        visualizer = 'wavelength';
      }
      chosenInstrumentName = e.target.value;
    }
    console.log(visualizer)
    if(INSTRUMENTS.includes(chosenInstrumentName)){
      chosenInstrument.destroy();
    }
    switch(chosenInstrumentName){
      case 'synth':
        return chosenInstrument = new Synth({visualizer: visualizer, isPluckySound: false});
      case 'bird':
        return chosenInstrument = new Audio({sounds: BIRDS['BIRD_SOUNDS'], visualizer: visualizer});
      case 'plucky':
        return chosenInstrument = new Synth({visualizer: visualizer, isPluckySound: true});
      default:
        return chosenInstrument = new Synth({visualizer: 'wavelength', isPluckySound: true});
    }
  }

  selectedVisualization.onchange = (e) => {
    selectedSound.onchange(e);
  }

  // Add listener for modal close 
    const modalClose = document.getElementById("modal-close");
    const modal = document.getElementById("instructions");

    modalClose.addEventListener("click", () => {
      modal.className = "hidden"
    })
});

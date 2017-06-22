/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = ".";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// Start at C2#
const NOTES = {
  32: 58.27,
  90: 69.30,
  88: 77.78,
  67: 92.50,
  86: 103.83,
  66: 116.54,
  78: 138.59,
  77: 155.56,
  188: 185.00,
  190: 207.65,
  191: 233.08,
  65: 277.18,
  83: 311.13,
  68: 369.99,
  70: 415.30,
  71: 466.16,
  72: 554.37,
  74: 622.25,
  75: 739.99,
  76: 830.61,
  186: 932.33,
  222: 1108.73,
  81: 1244.51,
  87: 1479.98,
  69: 1661.22,
  82: 1864.66,
  84: 2217.46,
  89: 2489.02,
  85: 2959.96,
  73: 3322.44,
  79: 3729.31,
  80: 4434.92,
  219: 4978.03,
  221: 5919.91
}

module.exports = NOTES;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const BufferLoader = __webpack_require__(8);
const Visualization = __webpack_require__(6);

class Audio{
  constructor(options){
    this.keyDown = false;
    this.sounds = options.sounds;
    this.visualizer = options.visualizer;
    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.destroy = this.destroy.bind(this);

    this.audioContext = new AudioContext();
    this.loadAllSounds.bind(this)();

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }


  handleKeyDown(e){
    if (!this.keyDown){
      this.keyDown = true;
      debugger 
      this.playSound(e.keyCode);
    }
  }

  handleKeyUp(e){
    this.source.stop(1);
    this.keyDown = false;

  }

  loadAllSounds(){
    let context = this.audioContext;
    let sounds = this.sounds
    this.bufferLoader = new BufferLoader({
      context,
      urlList: sounds,
      onload: () => {
      }
    });
  }

  playSound(keyCode){
    // For ech sound, create and connect a buffer source
    const birdIndex = this.mapKeycodeToBufferIndex(keyCode);
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.bufferLoader.bufferList[birdIndex];

    this.analyser = this.audioContext.createAnalyser();
    this.visualization = new Visualization({
      analyser: this.analyser,
      visualizer: this.visualizer
    });
    this.visualization.draw();

    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.source.start(0);
  }

  mapKeycodeToBufferIndex(keycode){
    if (keycode == 32)
      return this.sounds.length - 1 
    else 
      return keycode % this.sounds.length;
    end 
  }

  destroy(){
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keydown", this.handleKeyDown);
    this.audioContext.close();
  }
}

module.exports = Audio;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

const BIRD_SOUNDS = [
  './assets/birds/mexican_parrot.mp3',
  './assets/birds/chicken_laying_egg.mp3',
  './assets/birds/lark.mp3',
  './assets/birds/lorie.mp3',
  './assets/birds/canary.mp3',
  './assets/birds/owl.mp3',
  './assets/birds/rooster.mp3',
  './assets/birds/blackbird.wav',
  './assets/birds/canary.wav',
  './assets/birds/crow.wav',
  './assets/birds/japanese_crow.mp3',
  './assets/birds/japanese_raven.wav',
  './assets/birds/kukoo.wav',
  './assets/birds/lark.mp3',
  './assets/birds/lorie.mp3',
  './assets/birds/nightingale.wav',
  './assets/birds/nightingale2.wav',
  './assets/birds/nightingale2.wav',
  './assets/birds/parrot.wav',
  './assets/birds/parrothello.wav',
  './assets/birds/titmouse.wav',
  './assets/birds/unknown_australian_bird.wav',
  './assets/birds/wakerone.mp3',
  './assets/birds/wing.ogg'
];
/* harmony export (immutable) */ __webpack_exports__["BIRD_SOUNDS"] = BIRD_SOUNDS;



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const NOTES =  __webpack_require__(0);
class KeyboardAnimation{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    // Handle notes outside of the keyboard displayed on screen
    if (!NOTES[e.keyCode]){
      return;
    }

    let characterKey;
    if (e.keyCode === 32){
      characterKey = 'space';
    } else {
      characterKey = e.key.toLowerCase();
    }
      document.getElementsByClassName(characterKey)[0]
      .classList.add('active');
  }

  handleKeyUp(e){
    if (!NOTES[e.keyCode]){
      return;
    }

    let characterKey;
    if (e.keyCode === 32){
      characterKey = 'space';
    } else {
      characterKey = e.key.toLowerCase();
    }
    document.getElementsByClassName(characterKey)[0]
    .classList.remove('active');
  }
}
module.exports = KeyboardAnimation;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const NOTES = __webpack_require__(0);
const Note = __webpack_require__(5);
class Synth{
  constructor(options){
    this.playNote = this.playNote.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.destroy = this.destroy.bind(this);

    this.audioContext = new AudioContext();

    this.notesPlaying = {};
    this.isPluckySound = options.isPluckySound;
    this.visualizer = options.visualizer;

    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);

  }

  handleKeyDown(e){
      const keyCode = e.keyCode;
      if (!NOTES[keyCode]){
        return;
      }
      if(!this.notesPlaying[keyCode]){
        this.notesPlaying[keyCode] = this.playNote(keyCode);
      }
  }

  handleKeyUp(e){
    if (!NOTES[e.keyCode]){
      return;
    }
    this.notesPlaying[e.keyCode].stop();
    delete this.notesPlaying[e.keyCode];
  }

  playNote(code){
    return new Note({
      code: code,
      context: this.audioContext,
      visualizer: this.visualizer,
      isPluckySound: this.isPluckySound
    });
  }

  destroy(){
    this.audioContext.close();
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keydown", this.handleKeyDown);
  }
}

module.exports = Synth;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const NOTES = __webpack_require__(0);
const Visualization = __webpack_require__(6);
class Note{
  constructor(options){
    this.audioContext = options.context;
    this.keyCode = options.code;
    this.isPluckySound = options.isPluckySound;
    this.visualizer = options.visualizer;

    this.stop = this.stop.bind(this);
    this.mapKeycodeToFrequency = this.mapKeycodeToFrequency.bind(this);
    this.playNote.bind(this)(this.keyCode);
    this.visualizations = {};
  }

  stop(){
    this.source.stop(0);
    this.visualization.destroy()
  }

  playNote(code){
    const freq = this.mapKeycodeToFrequency(code);
    this.source = this.audioContext.createOscillator();

    // Set note
    this.source.frequency.value = freq;

    // Set volume
    this.gain = this.audioContext.createGain();
    this.gain.gain.value = 0.3;

    if (this.isPluckySound){
      this.gain.gain.exponentialRampToValueAtTime(0.000001, this.audioContext.currentTime + 1);
    }

    // Set the reverb
    this.convolver = this.audioContext.createConvolver();

    // Set the lowpass
    this.biquad = this.audioContext.createBiquadFilter();
    this.biquad.type = "lowpass";
    this.biquad.q = 25;

    // Visualize frequency data
    this.analyser = this.audioContext.createAnalyser();
    this.visualization = new Visualization({
      analyser: this.analyser,
      visualizer: this.visualizer
    });
    this.visualization.draw();

    // Set the distortion
    // this.distortion = this.audioContext.createWaveShaper();

    // Connect everything
    // this.source.connect(this.analyser);
    // this.analyser.connect(this.distortion);
    this.source.connect(this.biquad);
    // this.convolver.connect(this.biquad);
    this.biquad.connect(this.gain);
    this.gain.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.source.start(0);
  }



  mapKeycodeToFrequency(code){
    return NOTES[code];
  }
}

module.exports = Note;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Visualization{
  constructor(options){
    this.analyser = options.analyser;
    this.canvasWidth = canvas.width;

    this.canvasHeight = canvas.height;
    this.visualizer = options.visualizer;

    this.draw = this.draw.bind(this);
    this.drawWavelength = this.drawWavelength.bind(this);
    this.drawFrequency = this.drawFrequency.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  draw(){
    if (this.visualizer == 'wavelength'){
      this.drawWavelength();
    } else {
      this.drawFrequency();
    }
  };

  drawWavelength(){
    this.analyser.fftSize= 2048;
    let bufferLength = this.analyser.fftSize;
    let dataArray = new Uint8Array(bufferLength);

    canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.requestId = requestAnimationFrame(this.drawWavelength);

    this.analyser.getByteTimeDomainData(dataArray);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'white';

    canvasContext.beginPath();

    let sliceWidth = this.canvasWidth * 1.0 / bufferLength;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = v * this.canvasHeight/2;
        canvasContext.lineTo(x, y);
      x += sliceWidth;
    }

    canvasContext.lineTo(this.canvasWidth, this.canvasHeight/2);
    canvasContext.stroke();
  }

  drawFrequency(){
    this.analyser.fftSize = 256;
    let bufferLength = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);

    canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.requestId = requestAnimationFrame(this.drawFrequency);

    this.analyser.getByteFrequencyData(dataArray);

    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    let barWidth = (this.canvasWidth / bufferLength)*2;
    let barHeight;
    let x = 70;

    for(let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]*0.8;

      canvasContext.fillStyle = 'white';
      canvasContext.fillRect(x,this.canvasHeight-barHeight/2,barWidth,barHeight);

      x += barWidth + 1;
    }
  }

  destroy(){
    setTimeout(() => {
      cancelAnimationFrame(this.requestId);
    }, 1000);
  }
}

module.exports = Visualization;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const KeyboardAnimation = __webpack_require__(3);
const Synth = __webpack_require__(4);
const BIRDS = __webpack_require__(2);
const Audio = __webpack_require__(1);
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

  let chosenInstrument = new Synth({
    visualizer: 'wavelength',
    isPluckySound: true
  });

  let visualizer;
  let chosenInstrumentName = 'synth';
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
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// Hat tip to http://middleearmedia.com/web-audio-api-bufferloader/

class BufferLoader{
  constructor(options){
    this.context = options.context;
    this.urlList = options.urlList;
    this.onload = options.onload;
    this.bufferList = new Array();
    this.loadCount = 0;

    this.loadBuffer = this.loadBuffer.bind(this);
    this.load = this.load.bind(this)();
  }

  loadBuffer(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;
    request.onload = function() {
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
        }
      );
    }
    request.send();
  }

  load(){
    for (let i = 0; i < this.urlList.length; ++i){
      this.loadBuffer(this.urlList[i], i);
    }
  }
}

module.exports = BufferLoader;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
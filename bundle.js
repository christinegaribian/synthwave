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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class KeyboardAnimation{
  constructor(keyboard){
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // this.keyDown = false;

    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    // if (!this.keyDown){
      document.getElementsByClassName(e.key)[0]
      .classList.add('active');
      // this.keyDown = true;
    // }
  }

  handleKeyUp(e){
    // this.keyDown = false;
    document.getElementsByClassName(e.key)[0]
    .classList.remove('active');
  }
}
module.exports = KeyboardAnimation;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const NOTES = __webpack_require__(2);

class Synth{
  constructor(keyboard){
    // bind contexts
    this.playNote = this.playNote.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.keyDown = false;

    // set audio context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();


    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e){
    if (!this.keyDown){
      this.playNote(e.keyCode);
      this.keyDown = true;
    }
  }

  handleKeyUp(e){
    this.source.stop(0);
    this.keyDown = false;
  }

  playNote(code){
    const freq = this.mapKeycodeToFrequency(code);
    this.source = this.audioContext.createOscillator();
    this.source.type = "sawtooth";

    // Set note
    this.source.frequency.value = freq;

    // Set volume
    this.gain = this.audioContext.createGain();
    this.gain.gain.value = 0.2;

    // Set the reverb
    this.convolver = this.audioContext.createConvolver();
    // this.convolver.buffer = concertHallBuffer;

    // Set the lowpass
    this.biquad = this.audioContext.createBiquadFilter();
    this.biquad.type = "lowpass";
    this.biquad.gain.value = 25;
    this.biquad.frequency.value = 1000;

    // Set the Audio Analyser
    // this.analyser = this.audioContext.createAnalyser();


    // Set the distortion
    // this.distortion = this.audioContext.createWaveShaper();

    // Connect everything
    // this.source.connect(this.analyser);
    // this.analyser.connect(this.distortion);
    this.source.connect(this.biquad);
    // this.convolver.connect(this.biquad);
    this.biquad.connect(this.gain);
    this.gain.connect(this.audioContext.destination);
    this.source.start(0);
  }

  mapKeycodeToFrequency(code){
    return NOTES[code];
  }
}

module.exports = Synth;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// Start at C2#
const NOTES = {
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Synth = __webpack_require__(1);
const KeyboardAnimation = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function(){
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);
  const synth = new Synth(keyboard);


});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
    this.keyDown = false;

    // bind contexts
    this.playNote = this.playNote.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);


    // set audio context
    this.audioContext = new AudioContext();


    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e){
    if (!this.keyDown){
      this.keyDown = true;
      this.playNote(e.keyCode);
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
    this.analyser = this.audioContext.createAnalyser();
    // this.analyser.minDecibels = -90;
    // this.analyser.maxDecibels = -10;
    // this.analyser.smoothingTimeConstant = 0.65;
    // this.analyser.fftSize = 512;

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

const KeyboardAnimation = __webpack_require__(0);
const Synth = __webpack_require__(1);
const Bird = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", function(){
  const keyboard = document.getElementById("keyboard");
  const animation = new KeyboardAnimation(keyboard);

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  // const synth = new Synth(keyboard);
  const bird = new Bird(keyboard);


});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const BufferLoader = __webpack_require__(5);

const SOUNDS = [
  '../assets/birds/mexican_parrot.mp3'
];

class Bird{
  constructor(keyboard){
    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.finishedLoading = this.finishedLoading.bind(this);

    this.keyDown = false;
    this.audioContext = new AudioContext();

    this.loaded = false;
    // this.loadAllSounds.bind(this)('../assets/birds/mexican_parrot.mp3');
    this.loadAllSounds.bind(this)();
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    if (!this.keyDown){
      this.playSound(e.keyCode);
      this.keyDown = true;
    }
  }

  handleKeyUp(e){
    this.source.stop(0);
    this.keyDown = false;
  }

  loadAllSounds(){
    let context = this.audioContext;
    let playSound = this.playSound;
    // let bufferLoader = this.bufferLoader;

    SOUNDS.forEach((sound) => {

    })

    this.bufferLoader = new BufferLoader(
      context,
      SOUNDS,
      playSound
    );
    this.bufferLoader.load();
  }

  // finishedLoading(bufferList) {
  //   // For ech sound, create and connect a buffer source
  //   var kick = context.createBufferSource();
  //   kick.buffer = bufferList[0];
  //
  //   kick.connect(context.destination);
  //   // Play them together
  //   kick.start(0);
  //   // snare.start(0);
  //   // hihat.start(0);
  // }

  playSound(bufferList){
    // For ech sound, create and connect a buffer source
    var kick = context.createBufferSource();
    kick.buffer = bufferList[0];

    kick.connect(context.destination);
    // Play them together
    kick.start(0);
    // snare.start(0);
    // hihat.start(0);
    // this.source = this.audioContext.createBufferSource();
    // this.source.buffer = this.bufferLoader[0];
    //
    // this.source.connect(this.audioContext.destination);
    // this.source.start();
  }

}

module.exports = Bird;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// http://middleearmedia.com/web-audio-api-bufferloader/

class BufferLoader{
  constructor(context, urlList, callback){
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }

  loadBuffer(url, index) {
    var request = new XMLHttpRequest();
    console.log("getting request");
    request.open("GET", url, true);
    console.log("got request");
    console.log(request);
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

    // request.onerror() {
    //   alert('BufferLoader: XHR error');
    // }
    console.log("still working");
    request.send();
  }

  load(){
    for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  }
}

module.exports = BufferLoader;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
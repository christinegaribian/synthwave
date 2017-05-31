const NOTES = require('./notes');

class Note{
  constructor(code, context){
    this.audioContext = context;
    // this.keyDown = keyDown;
    this.keyCode = code;

    // this.handleKeyUp = this.handleKeyUp.bind(this);
    // window.addEventListener("keyup", this.handleKeyUp);
    this.mapKeycodeToFrequency = this.mapKeycodeToFrequency.bind(this);
    this.playNote.bind(this)(code);
  }

  // handleKeyDown(e){
  //   if (!this.keyDown){
  //     this.keyDown = true;
  //     this.playNote(e.keyCode);
  //   }
  // }
  //
  // handleKeyUp(e){
  //   // if (e.which === this.keyCode){
  //     this.source.stop(0);
  //   // }
  // }

  stop(){
    this.source.stop(0);
  }

  playNote(code){
    const freq = this.mapKeycodeToFrequency(code);
    this.source = this.audioContext.createOscillator();

    // Set note
    this.source.frequency.value = freq;

    // Set volume
    this.gain = this.audioContext.createGain();
    this.gain.gain.value = 0.3;
    // this.gain.gain.exponentialRampToValueAtTime(0.000001, this.audioContext.currentTime + 1);

    // Set the reverb
    this.convolver = this.audioContext.createConvolver();
    // this.convolver.buffer = concertHallBuffer;

    // Set the lowpass
    this.biquad = this.audioContext.createBiquadFilter();
    // this.biquad.type = "hipass";
    // this.biquad.gain.value = 25;
    // this.biquad.frequency.value = 1000;


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

  // destroy(){
  //   window.removeEventListener("keyup", this.handleKeyUp);
  //   window.removeEventListener("keydown", this.handleKeyDown);
  // }
}

module.exports = Note;

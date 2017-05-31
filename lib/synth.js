// const NOTES = require('./notes');
const Note = require('./note');
class Synth{
  constructor(){
    this.keyDown = false;
    // console.log("in synth");

    // bind contexts
    this.playNote = this.playNote.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.destroy = this.destroy.bind(this);

    // set audio context
    this.audioContext = new AudioContext();
    // this.lastKeyCode = 0;
    //
    this.notesPlaying = {};

    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);

  }

  handleKeyDown(e){
    // console.log("outside");
    // if (!this.keyDown){
    //   this.keyDown = true;
      // this.lastKeyCode = e.keyCode;
      // console.log("making osc");
      // this.oscillators[e.keyCode] = new Note(e.keyCode, this.audioContext);
      // console.log(this.notesPlaying);
      if(!this.notesPlaying[e.keyCode]){
        this.notesPlaying[e.keyCode] = this.playNote(e.keyCode);
        this.playNote(e.keyCode);
      }
    // }
  }

  handleKeyUp(e){
    // console.log("going up");
    // console.log(this.oscillators[e.keyCode]);
    this.notesPlaying[e.keyCode].stop();
    console.log(this.notesPlaying[e.keyCode]);
    // console.log("stopped");

    // this.keyDown = false;
    delete this.notesPlaying[e.keyCode];
  }

  playNote(code){
    return new Note(code, this.audioContext);
    //
    // const freq = this.mapKeycodeToFrequency(code);
    // this.source = this.audioContext.createOscillator();
    // // this.source.type = "sawtooth";
    //
    // // Set note
    // this.source.frequency.value = freq;
    //
    // // Set volume
    // this.gain = this.audioContext.createGain();
    // this.gain.gain.value = 0.3;
    // // this.gain.gain.exponentialRampToValueAtTime(0.000001, this.audioContext.currentTime + 1);
    //
    // // Set the reverb
    // this.convolver = this.audioContext.createConvolver();
    // // this.convolver.buffer = concertHallBuffer;
    //
    // // Set the lowpass
    // this.biquad = this.audioContext.createBiquadFilter();
    // // this.biquad.type = "hipass";
    // // this.biquad.gain.value = 25;
    // // this.biquad.frequency.value = 1000;
    //
    //
    // // Set the Audio Analyser
    // this.analyser = this.audioContext.createAnalyser();
    // // this.analyser.minDecibels = -90;
    // // this.analyser.maxDecibels = -10;
    // // this.analyser.smoothingTimeConstant = 0.65;
    // // this.analyser.fftSize = 512;
    //
    // // Set the distortion
    // // this.distortion = this.audioContext.createWaveShaper();
    //
    // // Connect everything
    // // this.source.connect(this.analyser);
    // // this.analyser.connect(this.distortion);
    // this.source.connect(this.biquad);
    // // this.convolver.connect(this.biquad);
    // this.biquad.connect(this.gain);
    // this.gain.connect(this.analyser);
    // this.analyser.connect(this.audioContext.destination);
    // this.source.start(0);
  }
  //
  // mapKeycodeToFrequency(code){
  //   return NOTES[code];
  // }

  destroy(){
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keydown", this.handleKeyDown);
  }
}

module.exports = Synth;

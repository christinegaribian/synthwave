const NOTES = require('./notes');

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

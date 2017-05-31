const NOTES = require('./notes');
const Visualization = require('./visualization');
class Note{
  constructor(code, context, isPluckySound = false){
    this.audioContext = context;
    this.keyCode = code;
    this.stop = this.stop.bind(this);
    this.isPluckySound = isPluckySound;

    this.mapKeycodeToFrequency = this.mapKeycodeToFrequency.bind(this);
    this.playNote.bind(this)(code);
  }

  stop(){
    this.source.stop(0);
  }

  playNote(code){
    // Handle notes outside of the keyboard displayed on screen
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
    // this.convolver.buffer = concertHallBuffer;

    // Set the lowpass
    this.biquad = this.audioContext.createBiquadFilter();
    this.biquad.type = "lowpass";
    this.biquad.q = 25;
    // this.biquad.gain.value = 25;
    // this.biquad.frequency.value = 1000;


    // Visualize frequency data
    this.analyser = this.audioContext.createAnalyser();
    // const bufferLength = this.analyser.frequencyBinCount;
    // const dataArray = new Uint8Array(bufferLength);
    new Visualization(this.analyser).draw();

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

module.exports = Note;

const NOTES = require('./notes');
const Visualization = require('./visualization');
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

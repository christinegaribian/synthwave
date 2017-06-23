// const NOTES = require('./notes');
const Visualization = require('./visualization');
class Sound{
  constructor(options){
    this.audioContext = options.context;
    this.keyCode = options.code;
    // this.isPluckySound = options.isPluckySound;
    this.visualizer = options.visualizer;

    this.stop = this.stop.bind(this);
    this.mapKeycodeToBufferIndex = this.mapKeycodeToBufferIndex.bind(this);
    this.visualizations = {};
    // this.soundsLength = options.bufferLoader.length
    this.bufferLoader = options.bufferLoader;
        this.playSound.bind(this)(this.keyCode);

  }

  stop(){
    this.source.stop(0);
    this.visualization.destroy()
  }

  playSound(keyCode){
   // For each sound, create and connect a buffer source
    const birdIndex = this.mapKeycodeToBufferIndex(keyCode);
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.bufferLoader.bufferList[birdIndex];
    
    this.gain = this.audioContext.createGain();
    this.gain.gain.value = 0.3;

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.8;
    this.visualization = new Visualization({
      analyser: this.analyser,
      visualizer: this.visualizer
    });
    this.visualization.draw();

    this.source.connect(this.gain);
    this.gain.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    this.source.start(0);
  }

  mapKeycodeToBufferIndex(keycode){
    if (keycode == 32){
      return this.bufferLoader.bufferList.length - 1;
    } else { 
      return keycode % this.bufferLoader.bufferList.length;
    }
  }
}

module.exports = Sound;

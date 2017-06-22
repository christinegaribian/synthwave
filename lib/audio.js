const BufferLoader = require('./bufferLoader');
const Visualization = require('./visualization');

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
    
    this.gain = this.audioContext.createGain();
    this.gain.gain.value = 0.3;

    this.analyser = this.audioContext.createAnalyser();
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
      return this.sounds.length - 1 
    } else { 
      return keycode % this.sounds.length;
    }
  }

  destroy(){
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keydown", this.handleKeyDown);
    this.audioContext.close();
  }
}

module.exports = Audio;

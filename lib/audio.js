const BufferLoader = require('./bufferLoader');
// const Visualization = require('./visualization');
const Sound = require('./sound');

class Audio{
  constructor(options){
    this.keyDown = false;
    this.sounds = options.sounds;
    this.visualizer = options.visualizer;
    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.destroy = this.destroy.bind(this);

    this.notesPlaying = {};
    this.audioContext = new AudioContext();
    this.loadAllSounds.bind(this)();

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }


  handleKeyDown(e){
    const keyCode = e.keyCode;
    if(!this.notesPlaying[keyCode]){
      this.keyDown = true;
      this.notesPlaying[keyCode] = this.playSound(keyCode);
    }
    // if (!this.keyDown){
    //   this.keyDown = true;
    //   this.playSound(e.keyCode);
    // }
  }

  handleKeyUp(e){
    this.notesPlaying[e.keyCode].stop(1);
    delete this.notesPlaying[e.keyCode];
    // this.source.stop(1);
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
    // const birdIndex = this.mapKeycodeToBufferIndex(keyCode);
    // this.source = this.audioContext.createBufferSource();
    // this.source.buffer = this.bufferLoader.bufferList[birdIndex];
    
    // this.gain = this.audioContext.createGain();
    // this.gain.gain.value = 0.3;

    // this.analyser = this.audioContext.createAnalyser();
    // this.analyser.smoothingTimeConstant = 0.8;
    // this.visualization = new Visualization({
    //   analyser: this.analyser,
    //   visualizer: this.visualizer
    // });
    // this.visualization.draw();

    // this.source.connect(this.gain);
    // this.gain.connect(this.analyser);
    // this.analyser.connect(this.audioContext.destination);
    // this.source.start(0);

    return new Sound({
      code: keyCode, 
      context: this.audioContext, 
      visualizer: this.visualizer,
      bufferLoader: this.bufferLoader
    });
  }
        // soundLength: this.sounds.length,


  destroy(){
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keydown", this.handleKeyDown);
    this.audioContext.close();
  }
}

module.exports = Audio;

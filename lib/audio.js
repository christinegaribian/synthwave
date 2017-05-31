const BufferLoader = require('./bufferLoader');

class Audio{
  constructor(sounds){
    this.keyDown = false;
    this.sounds = sounds;
    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.destroy = this.destroy.bind(this);

    // this.mapKeycodeToBufferIndex = this.mapKeycodeToBufferIndex.bind(this);
    // this.finishedLoading = this.finishedLoading.bind(this);

    this.audioContext = new AudioContext();
    this.loadAllSounds.bind(this)();

    // this.loaded = false;
    // this.loadAllSounds.bind(this)('../assets/birds/mexican_parrot.mp3');
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }


  handleKeyDown(e){
      // console.log("y");
    // if (!this.keyDown){
      // console.log("down");
      this.keyDown = true;
      this.playSound(e.keyCode);
      // console.log(this.keyDown);
    // }
  }

  handleKeyUp(e){
    // console.log("up");
    this.source.stop(0);
    this.keyDown = false;
    // console.log(this.keyDown);

  }

  loadAllSounds(){
    let context = this.audioContext;
    let sounds = this.sounds;

    this.bufferLoader = new BufferLoader(
      context,
      this.sounds,
      () => {
      // console.log("loaded");
      }
    );
    this.bufferLoader.load();
  }

  playSound(keyCode){
    // For ech sound, create and connect a buffer source
    const birdIndex = this.mapKeycodeToBufferIndex(keyCode);
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.bufferLoader.bufferList[birdIndex];
    this.source.connect(this.audioContext.destination);
    this.source.start(0);
  }

  mapKeycodeToBufferIndex(keycode){
    return keycode % 7;
  }

  destroy(){
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keydown", this.handleKeyDown);
  }
}

module.exports = Audio;

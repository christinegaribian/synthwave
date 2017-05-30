const BufferLoader = require('./bufferLoader');

const SOUNDS = [
  '../assets/birds/mexican_parrot.mp3'
];

class Bird{
  constructor(){
    this.keyDown = false;

    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
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
    if (!this.keyDown){
      console.log("down");
      this.keyDown = true;
      this.playSound(e.keyCode);
    }
  }

  handleKeyUp(e){
    console.log("up");
    this.keyDown = false;
    this.source.stop(6);
  }

  loadAllSounds(){
    let context = this.audioContext;
    let playSound = this.playSound;

    this.bufferLoader = new BufferLoader(
      context,
      SOUNDS,
      () => {
      console.log("loaded");
      }
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

  playSound(keyCode){
    // For ech sound, create and connect a buffer source
    console.log("playing");
    const birdIndex = this.mapKeycodeToBufferIndex(keyCode);
    console.log(birdIndex);
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.bufferLoader.bufferList[birdIndex];
    this.source.connect(this.audioContext.destination);
    this.source.start(0);
  }

  mapKeycodeToBufferIndex(keycode){
    return 0;
  }
}

module.exports = Bird;

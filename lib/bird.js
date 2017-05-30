const BufferLoader = require('./bufferLoader');

const SOUNDS = [
  '../assets/birds/mexican_parrot.mp3'
];

class Bird{
  constructor(keyboard){
    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    // this.finishedLoading = this.finishedLoading.bind(this);

    this.keyDown = false;
    this.audioContext = new AudioContext();

    this.loaded = false;
    // this.loadAllSounds.bind(this)('../assets/birds/mexican_parrot.mp3');
    this.loadAllSounds.bind(this)();
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);
  }


  handleKeyDown(e){
    if (!this.keyDown){
      this.playSound(e.keyCode);
      this.keyDown = true;
    }
  }

  handleKeyUp(e){
    this.source.stop(0);
    this.keyDown = false;
  }

  loadAllSounds(){
    let context = this.audioContext;
    let playSound = this.playSound;
    // let bufferLoader = this.bufferLoader;
    //
    // SOUNDS.forEach((sound) => {
    //
    // })

    this.bufferLoader = new BufferLoader(
      context,
      SOUNDS,
      playSound
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

  playSound(){
    // For ech sound, create and connect a buffer source
    var bird = this.audioContext.createBufferSource();
    bird.buffer = this.bufferLoader.bufferList[0];
    bird.connect(this.audioContext.destination);
    bird.start(0);
  }

}

module.exports = Bird;

const NOTES = require('./notes');
const Note = require('./note');
class Synth{
  constructor(options){
    this.playNote = this.playNote.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.destroy = this.destroy.bind(this);

    this.audioContext = new AudioContext();

    this.notesPlaying = {};
    this.isPluckySound = options.isPluckySound;
    this.visualizer = options.visualizer;

    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("keydown", this.handleKeyDown);

  }

  handleKeyDown(e){
      const keyCode = e.keyCode;
      if (!NOTES[e.keyCode]){
        return;
      }
      if(!this.notesPlaying[keyCode]){
        this.notesPlaying[keyCode] = this.playNote(keyCode);
      }
  }

  handleKeyUp(e){
    if (!NOTES[e.keyCode]){
      return;
    }
    this.notesPlaying[e.keyCode].stop();
    delete this.notesPlaying[e.keyCode];
  }

  playNote(code){
    return new Note({
      code: code,
      context: this.audioContext,
      visualizer: this.visualizer,
      isPluckySound: this.isPluckySound
    });
  }

  destroy(){
    this.audioContext.close();
    window.removeEventListener("keyup", this.handleKeyUp);
    window.removeEventListener("keydown", this.handleKeyDown);
  }
}

module.exports = Synth;
